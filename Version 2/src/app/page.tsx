"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/** =========================================================
 *  Lingua MVP – All-in-one page.tsx
 *  Tabs: Lernen | Übungen | Decks | Profil | Settings
 *  Features:
 *  - Flashcards (Vokabel + Satz)
 *  - SRS (light)
 *  - Practice: Cloze + Multiple Choice
 *  - Gamification: XP, Level, Streak, Daily Goal, Achievements
 *  - Analytics: 14-day stats + simple insights
 *  - Themes: Light/Dark toggle + Palette (requires globals.css vars)
 *  - TTS (Web Speech API) – free
 *  - Auto-Import (Tatoeba) via /api/tatoeba (optional)
 * ========================================================= */

/** -----------------------------
 * Types
 * ------------------------------ */
type CardKind = "vocab" | "sentence";
type View = "learn" | "practice" | "decks" | "profile" | "settings";
type ThemeMode = "light" | "dark";
type AppTheme = "ocean" | "sunset" | "lime" | "grape";

type Card = {
  id: string;
  kind: CardKind;
  deckId: string;
  front: string;
  back: string;

  example?: string;
  exampleTranslation?: string;
  audioUrl?: string;

  due: number;
  intervalDays: number;
  ease: number;
  lapses: number;
  lastReviewed?: number;
};

type Deck = {
  id: string;
  name: string;
  fromLang: string; // DE/EN/...
  toLang: string;
};

type DailyStat = { reviewed: number; correct: number; wrong: number; minutes: number };

type Achievement = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  unlockedAt?: number;
};

type Profile = {
  username: string;
  xp: number;
  level: number;
  streak: number;
  bestStreak: number;
  dailyGoal: number; // cards/day
  lastActiveDay: string; // YYYY-MM-DD
  createdAt: number;
};

type AppData = {
  decks: Deck[];
  cards: Card[];
  dailyStats: Record<string, DailyStat>;
  profile: Profile;
  achievements: Achievement[];
};

/** -----------------------------
 * Storage keys
 * ------------------------------ */
const STORAGE_KEY = "lingua_mvp_v4";
const THEME_KEY = "lingua_theme_mode_v1";
const PALETTE_KEY = "lingua_palette_v1";

/** -----------------------------
 * Theme classes (defined in globals.css)
 * ------------------------------ */
const THEME_CLASS: Record<AppTheme, string> = {
  ocean: "theme-ocean",
  sunset: "theme-sunset",
  lime: "theme-lime",
  grape: "theme-grape",
};

/** -----------------------------
 * Language map for Tatoeba + TTS
 * ------------------------------ */
const UI_TO_TATOEBA: Record<string, string> = { DE: "deu", EN: "eng", ES: "spa", FR: "fra", RU: "rus" };
const TTS_LANG: Record<string, string> = { DE: "de-DE", EN: "en-US", ES: "es-ES", FR: "fr-FR", RU: "ru-RU" };

/** -----------------------------
 * Helpers
 * ------------------------------ */
function uid() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c: any = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}
function pickRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function diffDays(a: string, b: string) {
  // YYYY-MM-DD
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = new Date(ay, am - 1, ad).getTime();
  const db = new Date(by, bm - 1, bd).getTime();
  return Math.round((db - da) / (24 * 60 * 60 * 1000));
}

/** -----------------------------
 * SRS light
 * ------------------------------ */
function schedule(card: Card, correct: boolean): Card {
  const now = Date.now();
  let ease = card.ease;
  let intervalDays = card.intervalDays;

  if (correct) {
    ease = clamp(ease + 0.05, 1.3, 2.8);
    if (intervalDays <= 0) intervalDays = 1;
    else if (intervalDays === 1) intervalDays = 3;
    else intervalDays = Math.round(intervalDays * ease);
  } else {
    ease = clamp(ease - 0.15, 1.3, 2.8);
    intervalDays = 0;
  }

  const due = now + (correct ? intervalDays : 0.25) * 24 * 60 * 60 * 1000; // wrong => retry in ~6h
  return {
    ...card,
    ease,
    intervalDays,
    due,
    lapses: correct ? card.lapses : card.lapses + 1,
    lastReviewed: now,
  };
}

/** -----------------------------
 * Practice helpers
 * ------------------------------ */
function makeCloze(sentence: string) {
  const cleanedWords = sentence
    .split(/\s+/)
    .map((w) => w.replace(/[.,!?;:()"„“”“'’]/g, ""))
    .filter(Boolean);

  const candidates = cleanedWords.filter((w) => w.length >= 4);
  const answer = candidates.length ? pickRandom(candidates) : cleanedWords[cleanedWords.length - 1] ?? "";
  const re = new RegExp(`\\b${escapeRegExp(answer)}\\b`);
  const cloze = sentence.replace(re, "____");
  return { cloze, answer };
}
function makeChoices(correct: string, pool: string[], n = 4) {
  const wrongs = pool.filter((x) => x !== correct);
  const picks = new Set<string>([correct]);
  while (picks.size < n && wrongs.length) picks.add(pickRandom(wrongs));
  return Array.from(picks).sort(() => Math.random() - 0.5);
}

/** -----------------------------
 * Free TTS (Web Speech API)
 * ------------------------------ */
function speak(text: string, lang?: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);

  const targetLang = lang || "en-US";

  function pickVoice() {
    const voices = synth.getVoices();
    if (!voices.length) return;

    // exakte Sprache
    let voice =
      voices.find(v => v.lang?.toLowerCase() === targetLang.toLowerCase()) ||
      // gleiche Hauptsprache (ru-*)
      voices.find(v => v.lang?.toLowerCase().startsWith(targetLang.split("-")[0].toLowerCase())) ||
      // notfalls irgendwas
      voices[0];

    if (voice) utter.voice = voice;
    utter.lang = voice?.lang || targetLang;

    synth.cancel();
    synth.speak(utter);
  }

  // Stimmen sind bei manchen Browsern erst später geladen
  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = pickVoice;
  } else {
    pickVoice();
  }
}

function stopSpeak() {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
}

// Mehr Audio Feedback
function playTone(type: "good" | "bad") {
  if (typeof window === "undefined") return;

  const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext);
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const o = ctx.createOscillator();
  const g = ctx.createGain();

  o.type = "sine";

  // kleine “Jingle” Frequenzen
  const now = ctx.currentTime;
  if (type === "good") {
    o.frequency.setValueAtTime(784, now);      // G5
    o.frequency.exponentialRampToValueAtTime(1046.5, now + 0.12); // C6
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.15, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    o.connect(g); g.connect(ctx.destination);
    o.start(now);
    o.stop(now + 0.20);
  } else {
    o.frequency.setValueAtTime(220, now);      // A3
    o.frequency.exponentialRampToValueAtTime(155, now + 0.18); // ~D#3
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    o.connect(g); g.connect(ctx.destination);
    o.start(now);
    o.stop(now + 0.24);
  }

  // cleanup
  setTimeout(() => ctx.close().catch(() => {}), 400);
}

function vibrate(ms: number) {
  if (typeof window === "undefined") return;
  // Android Chrome/WebView kann das oft
  navigator.vibrate?.(ms);
}

/** -----------------------------
 * Gamification: XP / Level / Achievements
 * ------------------------------ */
function xpForLevel(level: number) {
  // XP needed to go from (level) to (level+1)
  return Math.round(100 * Math.pow(level, 1.2));
}
function computeLevelFromXp(totalXp: number) {
  let lvl = 1;
  let xp = totalXp;
  while (xp >= xpForLevel(lvl) && lvl < 200) {
    xp -= xpForLevel(lvl);
    lvl += 1;
  }
  const currentNeed = xpForLevel(lvl);
  const progress = currentNeed === 0 ? 0 : clamp(xp / currentNeed, 0, 1);
  return { level: lvl, xpIntoLevel: xp, xpNeed: currentNeed, progress };
}
function addXp(profile: Profile, amount: number) {
  const newXp = Math.max(0, profile.xp + amount);
  const { level } = computeLevelFromXp(newXp);
  return { ...profile, xp: newXp, level };
}

function defaultAchievements(): Achievement[] {
  return [
    { id: "first10", title: "Erste Schritte", desc: "Lerne 10 Karten", icon: "✨" },
    { id: "streak3", title: "Konsequent", desc: "3 Tage Streak", icon: "🔥" },
    { id: "streak7", title: "Eine Woche", desc: "7 Tage Streak", icon: "🏅" },
    { id: "review100", title: "Hundert", desc: "Lerne 100 Karten", icon: "💯" },
    { id: "review500", title: "Marathon", desc: "Lerne 500 Karten", icon: "🏃" },
    { id: "perfect50day", title: "Perfektionist", desc: "50 richtige an einem Tag", icon: "🎯" },
    { id: "multilang3", title: "Explorer", desc: "Nutze 3 Sprachen/Decks", icon: "🧭" },
    { id: "nightowl", title: "Night Owl", desc: "Lerne nach 23:00", icon: "🌙" },
  ];
}

/** -----------------------------
 * Data load/save
 * ------------------------------ */
function loadData(): AppData {
  const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  if (raw) return JSON.parse(raw) as AppData;

  const deckId = uid();
  const now = Date.now();

  const profile: Profile = {
    username: "Learner",
    xp: 0,
    level: 1,
    streak: 0,
    bestStreak: 0,
    dailyGoal: 20,
    lastActiveDay: todayKey(),
    createdAt: now,
  };

  return {
    decks: [{ id: deckId, name: "Deutsch → Englisch", fromLang: "DE", toLang: "EN" }],
    cards: [
      {
        id: uid(),
        kind: "vocab",
        deckId,
        front: "laufen",
        back: "to run",
        example: "Ich laufe jeden Morgen.",
        exampleTranslation: "I run every morning.",
        due: now,
        intervalDays: 0,
        ease: 2.0,
        lapses: 0,
      },
      {
        id: uid(),
        kind: "vocab",
        deckId,
        front: "der Apfel",
        back: "the apple",
        example: "Der Apfel ist rot.",
        exampleTranslation: "The apple is red.",
        due: now,
        intervalDays: 0,
        ease: 2.0,
        lapses: 0,
      },
      {
        id: uid(),
        kind: "sentence",
        deckId,
        front: "Ich gehe heute nicht zur Arbeit.",
        back: "I am not going to work today.",
        due: now,
        intervalDays: 0,
        ease: 2.0,
        lapses: 0,
      },
      {
        id: uid(),
        kind: "sentence",
        deckId,
        front: "Kannst du mir bitte helfen?",
        back: "Can you please help me?",
        due: now,
        intervalDays: 0,
        ease: 2.0,
        lapses: 0,
      },
    ],
    dailyStats: {},
    profile,
    achievements: defaultAchievements(),
  };
}
function saveData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** =========================================================
 * Main page
 * ========================================================= */
export default function Page() {
  const [data, setData] = useState<AppData>(() => loadData());
  const [view, setView] = useState<View>("learn");
  const [activeDeckId, setActiveDeckId] = useState<string>(() => loadData().decks[0]?.id ?? "");
  const [showBack, setShowBack] = useState(false);

  const [mode, setMode] = useState<ThemeMode>("light");
  const [palette, setPalette] = useState<AppTheme>("ocean");

  // Import/Export
  const [importText, setImportText] = useState("");

  // Tatoeba import UI
  const [importing, setImporting] = useState(false);
  const [importFrom, setImportFrom] = useState("DE");
  const [importTo, setImportTo] = useState("EN");
  const [importCount, setImportCount] = useState(50);
  const [importStatus, setImportStatus] = useState<string>("");

  // Session timing (for analytics minutes)
  const sessionStartRef = useRef<number>(Date.now());

  /** --- init theme mode --- */
  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as ThemeMode | null) ?? "light";
    setMode(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);
  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  /** --- init palette --- */
  useEffect(() => {
    const saved = (localStorage.getItem(PALETTE_KEY) as AppTheme | null) ?? "ocean";
    setPalette(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem(PALETTE_KEY, palette);
    Object.values(THEME_CLASS).forEach((cls) => document.documentElement.classList.remove(cls));
    document.documentElement.classList.add(THEME_CLASS[palette]);
  }, [palette]);

  /** --- persist app data --- */
  useEffect(() => saveData(data), [data]);

  /** --- ensure active deck exists --- */
  useEffect(() => {
    if (!data.decks.find((d) => d.id === activeDeckId) && data.decks[0]) {
      setActiveDeckId(data.decks[0].id);
    }
  }, [data.decks, activeDeckId]);

  const activeDeck = useMemo(() => data.decks.find((d) => d.id === activeDeckId), [data.decks, activeDeckId]);

  const dueCards = useMemo(() => {
    const now = Date.now();
    return data.cards
      .filter((c) => c.deckId === activeDeckId && c.due <= now)
      .sort((a, b) => a.due - b.due);
  }, [data.cards, activeDeckId]);

  const nextCard = dueCards[0];

  const statsToday = useMemo(() => {
    const key = todayKey();
    return data.dailyStats[key] ?? { reviewed: 0, correct: 0, wrong: 0, minutes: 0 };
  }, [data.dailyStats]);

  /** ---------------------------------------------------------
   *  Stats + XP + Streak update
   * ---------------------------------------------------------- */
  function addMinutesSinceLastTick() {
    const now = Date.now();
    const elapsedMs = now - sessionStartRef.current;
    if (elapsedMs < 30_000) return 0; // only count after 30s chunks
    const minutes = Math.floor(elapsedMs / 60_000);
    if (minutes <= 0) return 0;
    sessionStartRef.current = now;
    return minutes;
  }

  function bumpDailyStats(correct: boolean) {
    const key = todayKey();
    const addedMinutes = addMinutesSinceLastTick();

    setData((prev) => {
      const cur = prev.dailyStats[key] ?? { reviewed: 0, correct: 0, wrong: 0, minutes: 0 };
      return {
        ...prev,
        dailyStats: {
          ...prev.dailyStats,
          [key]: {
            reviewed: cur.reviewed + 1,
            correct: cur.correct + (correct ? 1 : 0),
            wrong: cur.wrong + (correct ? 0 : 1),
            minutes: cur.minutes + addedMinutes,
          },
        },
      };
    });
  }

  function updateStreakIfGoalMet(nextDailyReviewed: number) {
    // If daily goal reached today -> ensure streak is updated.
    // Streak update is also handled when opening the app on a new day.
    const today = todayKey();
    setData((prev) => {
      const prof = prev.profile;
      const goal = prof.dailyGoal;
      if (nextDailyReviewed < goal) return prev; // not yet

      // If already counted today, do nothing
      if (prof.lastActiveDay === today && prof.streak > 0) {
        // streak already stands, just keep best
        return prev;
      }
      // determine day difference from lastActiveDay to today
      const delta = diffDays(prof.lastActiveDay, today);
      let streak = prof.streak;

      if (delta === 0) {
        // same day: keep streak
      } else if (delta === 1) {
        streak = prof.streak + 1;
      } else {
        streak = 1;
      }

      const best = Math.max(prof.bestStreak, streak);

      return {
        ...prev,
        profile: { ...prof, streak, bestStreak: best, lastActiveDay: today },
      };
    });
  }

  /** run on mount: streak reset logic if days missed */
  useEffect(() => {
    const today = todayKey();
    setData((prev) => {
      const prof = prev.profile;
      const delta = diffDays(prof.lastActiveDay, today);
      if (delta <= 0) return prev;
      if (delta === 1) {
        // carry over streak ONLY if yesterday goal was met; we approximate by: yesterday reviewed >= goal
        const y = new Date();
        y.setDate(y.getDate() - 1);
        const yKey = todayKey(y);
        const yStat = prev.dailyStats[yKey];
        const yMet = (yStat?.reviewed ?? 0) >= prof.dailyGoal;
        const streak = yMet ? prof.streak : 0;
        return { ...prev, profile: { ...prof, streak, lastActiveDay: today } };
      }
      // missed >=2 days
      return { ...prev, profile: { ...prof, streak: 0, lastActiveDay: today } };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ---------------------------------------------------------
   * Achievements unlocking
   * ---------------------------------------------------------- */
  function unlockAchievement(id: string) {
    setData((prev) => {
      const idx = prev.achievements.findIndex((a) => a.id === id);
      if (idx < 0) return prev;
      if (prev.achievements[idx].unlockedAt) return prev;
      const updated = [...prev.achievements];
      updated[idx] = { ...updated[idx], unlockedAt: Date.now() };
      return { ...prev, achievements: updated };
    });
  }

  function evaluateAchievements() {
    const today = todayKey();
    const todayStat = data.dailyStats[today] ?? { reviewed: 0, correct: 0, wrong: 0, minutes: 0 };

    const totalReviewed = Object.values(data.dailyStats).reduce((s, d) => s + (d.reviewed || 0), 0);
    const usedDecks = new Set(data.cards.map((c) => c.deckId)).size;

    if (totalReviewed >= 10) unlockAchievement("first10");
    if (totalReviewed >= 100) unlockAchievement("review100");
    if (totalReviewed >= 500) unlockAchievement("review500");
    if (data.profile.streak >= 3) unlockAchievement("streak3");
    if (data.profile.streak >= 7) unlockAchievement("streak7");
    if (todayStat.correct >= 50) unlockAchievement("perfect50day");
    if (usedDecks >= 3) unlockAchievement("multilang3");

    const hour = new Date().getHours();
    if (hour >= 23) unlockAchievement("nightowl");
  }

  useEffect(() => {
    // re-evaluate after stats/profile changes
    evaluateAchievements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.dailyStats, data.profile.streak]);

  /** ---------------------------------------------------------
   * Review flow (XP + stats + SRS)
   * ---------------------------------------------------------- */
  function grantXp(correct: boolean) {
    // Base XP
    const base = correct ? 10 : 3;
    setData((prev) => ({ ...prev, profile: addXp(prev.profile, base) }));
  }

  function review(correct: boolean) {
    if (!nextCard) return;

    setShowBack(false);

    playTone(correct ? "good" : "bad");
    vibrate(correct ? 20 : 60);

    // stats
    bumpDailyStats(correct);

    // xp
    grantXp(correct);

    // schedule
    setData((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => (c.id === nextCard.id ? schedule(c, correct) : c)),
    }));

    // goal / streak check (approx: use statsToday.reviewed +1)
    const nextReviewed = statsToday.reviewed + 1;
    updateStreakIfGoalMet(nextReviewed);

    // session bonus every 20 reviews
    if (nextReviewed > 0 && nextReviewed % 20 === 0) {
      setData((prev) => ({ ...prev, profile: addXp(prev.profile, 20) }));
    }
  }

  /** ---------------------------------------------------------
   * Deck + Card CRUD
   * ---------------------------------------------------------- */
  function addDeck() {
    const name = prompt("Name des Decks (z.B. Spanisch → Deutsch):");
    if (!name) return;
    const fromLang = prompt("Quellsprache (z.B. ES):", "ES") ?? "ES";
    const toLang = prompt("Zielsprache (z.B. DE):", "DE") ?? "DE";
    const d: Deck = { id: uid(), name, fromLang, toLang };
    setData((prev) => ({ ...prev, decks: [d, ...prev.decks] }));
    setActiveDeckId(d.id);
    setView("decks");
  }

  function deleteDeck(deckId: string) {
    if (!confirm("Deck wirklich löschen? Alle Karten darin werden ebenfalls gelöscht.")) return;
    setData((prev) => ({
      ...prev,
      decks: prev.decks.filter((d) => d.id !== deckId),
      cards: prev.cards.filter((c) => c.deckId !== deckId),
    }));
  }

  function addCard(deckId: string, kind: CardKind) {
    const front = kind === "vocab" ? prompt("Vokabel (Front):") : prompt("Satz (Front):");
    if (!front) return;

    const back = prompt("Übersetzung (Back):");
    if (!back) return;

    let example = "";
    let exampleTranslation = "";
    if (kind === "vocab") {
      example = (prompt("Beispiel-Satz (optional):") ?? "").trim();
      exampleTranslation = (prompt("Übersetzung des Beispiels (optional):") ?? "").trim();
    }

    const audioUrl = (prompt("Audio-URL (optional):") ?? "").trim();

    const c: Card = {
      id: uid(),
      kind,
      deckId,
      front,
      back,
      example: example || undefined,
      exampleTranslation: exampleTranslation || undefined,
      audioUrl: audioUrl || undefined,
      due: Date.now(),
      intervalDays: 0,
      ease: 2.0,
      lapses: 0,
    };

    setData((prev) => ({ ...prev, cards: [c, ...prev.cards] }));
  }

  function deleteCard(cardId: string) {
    if (!confirm("Karte wirklich löschen?")) return;
    setData((prev) => ({ ...prev, cards: prev.cards.filter((c) => c.id !== cardId) }));
  }

  /** ---------------------------------------------------------
   * Export / Import / Reset
   * ---------------------------------------------------------- */
  function exportJSON() {
    const payload = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(payload).catch(() => {});
    alert("Export in die Zwischenablage kopiert (JSON).");
  }

  function importJSON() {
    try {
      const parsed = JSON.parse(importText);
      if (!parsed?.decks || !parsed?.cards || !parsed?.profile) throw new Error("Ungültiges Format.");
      setData(parsed);
      setImportText("");
      alert("Import erfolgreich.");
    } catch (e: any) {
      alert("Import fehlgeschlagen: " + (e?.message ?? "Unbekannter Fehler"));
    }
  }

  function resetAll() {
    if (!confirm("Alles zurücksetzen?")) return;
    const fresh = loadData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    setData(fresh);
    setActiveDeckId(fresh.decks[0]?.id ?? "");
    setView("learn");
  }

  /** ---------------------------------------------------------
   * Tatoeba import (optional)
   * - Requires /api/tatoeba route (server) OR you can disable this UI.
   * ---------------------------------------------------------- */
  async function importFromTatoeba() {
    try {
      if (!activeDeckId) throw new Error("Kein aktives Deck.");
      if (importFrom === importTo) throw new Error("Von/Zu dürfen nicht identisch sein.");
      setImporting(true);
      setImportStatus("Lade…");

      const from = UI_TO_TATOEBA[importFrom] ?? "deu";
      const to = UI_TO_TATOEBA[importTo] ?? "eng";
      const limit = Math.min(Math.max(importCount, 10), 200);

      const res = await fetch(`/api/tatoeba?from=${from}&to=${to}&limit=${limit}`);
      const json = await res.json();
      if (!res.ok || json?.error) throw new Error(json?.error || "Import fehlgeschlagen");

      const items: any[] = json?.data ?? [];
      const now = Date.now();

      const newCards: Card[] = items
        .map((s) => {
          const srcText = s?.text;
          const transArr = Array.isArray(s?.translations) ? s.translations : [];
          const trans = transArr.find((tr: any) => tr?.lang === to) ?? transArr.find((tr: any) => tr?.text) ?? null;
          const trgText = trans?.text;

          const author = s?.owner?.username || s?.owner || "unknown";
          const sid = s?.id;

          if (!srcText || !trgText) return null;

          return {
            id: uid(),
            kind: "sentence",
            deckId: activeDeckId,
            front: String(srcText),
            back: String(trgText),
            due: now,
            intervalDays: 0,
            ease: 2.0,
            lapses: 0,
            example: `Quelle: Tatoeba · Autor: ${author} · ID: ${sid}`,
          } as Card;
        })
        .filter(Boolean) as Card[];

      setData((prev) => {
        const existing = new Set(prev.cards.map((c) => `${c.deckId}::${c.kind}::${c.front}::${c.back}`));
        const filtered = newCards.filter((c) => !existing.has(`${c.deckId}::${c.kind}::${c.front}::${c.back}`));
        setImportStatus(`✅ Importiert: ${filtered.length} (Duplikate ignoriert)`);
        return { ...prev, cards: [...filtered, ...prev.cards] };
      });
    } catch (e: any) {
      setImportStatus(`❌ ${e?.message ?? "Fehler"}`);
    } finally {
      setImporting(false);
    }
  }

  /** ---------------------------------------------------------
   * Profile derived
   * ---------------------------------------------------------- */
  const levelInfo = useMemo(() => computeLevelFromXp(data.profile.xp), [data.profile.xp]);

  const last14 = useMemo(() => {
    const days: { day: string; s: DailyStat }[] = [];
    const base = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(base);
      d.setDate(d.getDate() - i);
      const key = todayKey(d);
      const s = data.dailyStats[key] ?? { reviewed: 0, correct: 0, wrong: 0, minutes: 0 };
      days.push({ day: key, s });
    }
    return days;
  }, [data.dailyStats]);

  const totals = useMemo(() => {
    const all = Object.values(data.dailyStats);
    const reviewed = all.reduce((a, x) => a + (x.reviewed || 0), 0);
    const correct = all.reduce((a, x) => a + (x.correct || 0), 0);
    const wrong = all.reduce((a, x) => a + (x.wrong || 0), 0);
    const minutes = all.reduce((a, x) => a + (x.minutes || 0), 0);
    const acc = reviewed ? Math.round((correct / reviewed) * 100) : 0;
    return { reviewed, correct, wrong, minutes, acc };
  }, [data.dailyStats]);

  const unlockedCount = data.achievements.filter((a) => a.unlockedAt).length;

  const goalProgress = clamp(statsToday.reviewed / Math.max(1, data.profile.dailyGoal), 0, 1);
  const goalMet = statsToday.reviewed >= data.profile.dailyGoal;

  const nudge =
    !goalMet && statsToday.reviewed > 0
      ? `Nur noch ${Math.max(0, data.profile.dailyGoal - statsToday.reviewed)} Karten bis zum Tagesziel 💪`
      : !goalMet
      ? `Dein Tagesziel sind ${data.profile.dailyGoal} Karten. Let's go 🚀`
      : `Tagesziel erreicht! Streak sichern ✅`;

  /** =========================================================
   * Render
   * ========================================================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg1)] via-[var(--bg2)] to-[var(--bg3)] text-slate-900 dark:text-slate-50">
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-6">
        <Header
          view={view}
          setView={setView}
          activeDeck={activeDeck}
          dueCount={dueCards.length}
          mode={mode}
          toggleMode={() => setMode((t) => (t === "dark" ? "light" : "dark"))}
          level={data.profile.level}
          xp={data.profile.xp}
        />

        {/* ---------------- Learn ---------------- */}
        {view === "learn" && (
          <div className="mt-6 grid gap-4">
            <CardShell>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Aktives Deck</div>
                  <div className="text-lg font-semibold">{activeDeck?.name ?? "—"}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    <b className="text-slate-900 dark:text-slate-100">{dueCards.length}</b> fällig ·{" "}
                    <b className="text-slate-900 dark:text-slate-100">{statsToday.reviewed}</b> heute ·{" "}
                    <b className="text-slate-900 dark:text-slate-100">{data.profile.streak}</b>🔥 Streak
                  </div>
                </div>
                <Pill>{goalMet ? "✅ Ziel" : `${data.profile.dailyGoal} / Tag`}</Pill>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Tagesziel</span>
                  <span>
                    {statsToday.reviewed}/{data.profile.dailyGoal}
                  </span>
                </div>
                <div className="mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    style={{ width: `${Math.round(goalProgress * 100)}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">{nudge}</div>
              </div>
            </CardShell>

            <CardShell>
              {!nextCard ? (
                <EmptyState />
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Karte ·{" "}
                      <b className="text-slate-900 dark:text-slate-100">
                        {nextCard.kind === "vocab" ? "Vokabel" : "Satz"}
                      </b>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
                        onClick={() => {
                          const from = TTS_LANG[activeDeck?.fromLang ?? "DE"];
                          const to = TTS_LANG[activeDeck?.toLang ?? "EN"];
                          const lang = showBack ? to : from;
                          speak(showBack ? nextCard.back : nextCard.front, lang);
                        }}
                        title="Vorlesen"
                      >
                        🔊
                      </button>
                      <button
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950"
                        onClick={stopSpeak}
                        title="Stop"
                      >
                        ⏹
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowBack((s) => !s)}
                    className="mt-4 w-full rounded-2xl border border-slate-200 bg-[var(--cardSolid)] px-4 py-10 text-center text-xl font-semibold shadow-sm hover:shadow md:text-2xl dark:border-slate-800"
                  >
                    <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-indigo-300 dark:to-fuchsia-300">
                      {showBack ? nextCard.back : nextCard.front}
                    </span>
                    <div className="mt-2 text-sm font-normal text-slate-500 dark:text-slate-400">Tippe zum Umdrehen</div>
                  </button>

                  {nextCard.kind === "vocab" && (nextCard.example || nextCard.exampleTranslation) && (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                      {nextCard.example && <div className="font-semibold">{nextCard.example}</div>}
                      {nextCard.exampleTranslation && (
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{nextCard.exampleTranslation}</div>
                      )}
                    </div>
                  )}

                  {nextCard.kind === "sentence" && nextCard.example && (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200">
                      {nextCard.example}
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <FancyBtn variant="bad" onClick={() => review(false)} label="✖ Nicht gewusst" />
                    <FancyBtn variant="good" onClick={() => review(true)} label="✔ Gewusst" />
                  </div>

                  <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                    +{showBack ? "?" : ""} XP: <b className="text-slate-900 dark:text-slate-100">{/* purely UI */}</b>
                    Intervall: <b className="text-slate-900 dark:text-slate-100">{nextCard.intervalDays}d</b> · Ease:{" "}
                    <b className="text-slate-900 dark:text-slate-100">{nextCard.ease.toFixed(2)}</b> · Lapses:{" "}
                    <b className="text-slate-900 dark:text-slate-100">{nextCard.lapses}</b>
                  </div>
                </>
              )}
            </CardShell>

            <CardShell>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Heute</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Accuracy: <b className="text-slate-900 dark:text-slate-100">{statsToday.reviewed ? Math.round((statsToday.correct / statsToday.reviewed) * 100) : 0}%</b>
                    {" · "}
                    Minuten: <b className="text-slate-900 dark:text-slate-100">{statsToday.minutes}</b>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/60 px-4 py-2 text-sm font-semibold dark:border-slate-800 dark:bg-slate-950/60">
                  Level <span className="font-black">{data.profile.level}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>XP</span>
                  <span>
                    {levelInfo.xpIntoLevel}/{levelInfo.xpNeed}
                  </span>
                </div>
                <div className="mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                    style={{ width: `${Math.round(levelInfo.progress * 100)}%` }}
                  />
                </div>
              </div>
            </CardShell>
          </div>
        )}

        {/* ---------------- Practice ---------------- */}
        {view === "practice" && (
          <Practice
            cards={data.cards.filter((c) => c.deckId === activeDeckId)}
            onCorrect={() => {
              playTone("good");
              vibrate(20);
              bumpDailyStats(true);
              setData((prev) => ({ ...prev, profile: addXp(prev.profile, 6) }));
              updateStreakIfGoalMet(statsToday.reviewed + 1);
            }}
            onWrong={() => {
              playTone("bad");
              vibrate(60);
              bumpDailyStats(false);
              setData((prev) => ({ ...prev, profile: addXp(prev.profile, 2) }));
              updateStreakIfGoalMet(statsToday.reviewed + 1);
            }}
            fromLang={activeDeck?.fromLang ?? "DE"}
            toLang={activeDeck?.toLang ?? "EN"}
          />
        )}

        {/* ---------------- Decks ---------------- */}
        {view === "decks" && (
          <div className="mt-6 grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Decks & Karten</h2>
              <button
                onClick={addDeck}
                className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
              >
                ＋ Neues Deck
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {data.decks.map((d) => {
                const count = data.cards.filter((c) => c.deckId === d.id).length;
                const due = data.cards.filter((c) => c.deckId === d.id && c.due <= Date.now()).length;
                const vocabCount = data.cards.filter((c) => c.deckId === d.id && c.kind === "vocab").length;
                const sentCount = data.cards.filter((c) => c.deckId === d.id && c.kind === "sentence").length;
                const active = d.id === activeDeckId;

                return (
                  <div
                    key={d.id}
                    className={`rounded-2xl border p-5 shadow-sm ${
                      active ? "border-indigo-200 bg-[var(--card)] dark:border-indigo-900" : "border-slate-200 bg-[var(--card)] dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold">{d.name}</div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {d.fromLang} → {d.toLang} · {count} Karten ·{" "}
                          <b className="text-slate-900 dark:text-slate-100">{due}</b> fällig
                        </div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Vokabeln: {vocabCount} · Sätze: {sentCount}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setActiveDeckId(d.id);
                            setView("learn");
                          }}
                          className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
                        >
                          Lernen
                        </button>
                        <button
                          onClick={() => deleteDeck(d.id)}
                          className="rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
                        >
                          Löschen
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => addCard(d.id, "vocab")}
                        className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
                      >
                        ＋ Vokabel
                      </button>
                      <button
                        onClick={() => addCard(d.id, "sentence")}
                        className="rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
                      >
                        ＋ Satz
                      </button>
                    </div>

                    <div className="mt-4 max-h-72 overflow-auto rounded-2xl border border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-950/60">
                      {data.cards.filter((c) => c.deckId === d.id).length === 0 ? (
                        <div className="p-4 text-sm text-slate-500 dark:text-slate-400">Noch keine Karten.</div>
                      ) : (
                        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                          {data.cards
                            .filter((c) => c.deckId === d.id)
                            .slice(0, 60)
                            .map((c) => (
                              <li key={c.id} className="flex items-start justify-between gap-3 p-4">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                        c.kind === "vocab"
                                          ? "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-200"
                                          : "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200"
                                      }`}
                                    >
                                      {c.kind === "vocab" ? "Vokabel" : "Satz"}
                                    </span>
                                    <div className="truncate font-semibold">{c.front}</div>
                                  </div>
                                  <div className="truncate text-sm text-slate-500 dark:text-slate-400">{c.back}</div>
                                </div>

                                <button
                                  onClick={() => deleteCard(c.id)}
                                  className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm hover:shadow dark:border-slate-800 dark:bg-slate-950"
                                >
                                  Entfernen
                                </button>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>

                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Hinweis: Liste zeigt max. 60 Karten (MVP).</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------- Profile ---------------- */}
        {view === "profile" && (
          <div className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">Profil</h2>

            <CardShell>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 font-black text-white shadow">
                    {data.profile.username.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{data.profile.username}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Level <b className="text-slate-900 dark:text-slate-100">{data.profile.level}</b> ·{" "}
                      <b className="text-slate-900 dark:text-slate-100">{data.profile.xp}</b> XP total
                    </div>
                  </div>
                </div>

                <button
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950"
                  onClick={() => {
                    const name = prompt("Username ändern:", data.profile.username);
                    if (!name) return;
                    setData((prev) => ({ ...prev, profile: { ...prev.profile, username: name } }));
                  }}
                >
                  ✏️ Name
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>XP bis nächstes Level</span>
                  <span>
                    {levelInfo.xpIntoLevel}/{levelInfo.xpNeed}
                  </span>
                </div>
                <div className="mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                    style={{ width: `${Math.round(levelInfo.progress * 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <Stat label="Streak" value={data.profile.streak} suffix="🔥" />
                <Stat label="Best" value={data.profile.bestStreak} suffix="🏆" />
                <Stat label="Acc" value={totals.acc} suffix="%" />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Tagesziel</div>
                    <div className="text-lg font-semibold">
                      {statsToday.reviewed}/{data.profile.dailyGoal} Karten
                    </div>
                  </div>
                  <button
                    className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
                    onClick={() => {
                      const v = prompt("Tagesziel (Karten pro Tag):", String(data.profile.dailyGoal));
                      if (!v) return;
                      const n = clamp(Number(v), 5, 500);
                      setData((prev) => ({ ...prev, profile: { ...prev.profile, dailyGoal: n } }));
                    }}
                  >
                    ⚙️ ändern
                  </button>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>Fortschritt</span>
                    <span>{Math.round(goalProgress * 100)}%</span>
                  </div>
                  <div className="mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{ width: `${Math.round(goalProgress * 100)}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">{nudge}</div>
                </div>
              </div>
            </CardShell>

            <CardShell>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">Achievements</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Freigeschaltet: <b className="text-slate-900 dark:text-slate-100">{unlockedCount}</b> / {data.achievements.length}
                  </div>
                </div>
                <button
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950"
                  onClick={() => evaluateAchievements()}
                >
                  🔍 prüfen
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {data.achievements.map((a) => (
                  <div
                    key={a.id}
                    className={`rounded-2xl border p-4 shadow-sm ${
                      a.unlockedAt
                        ? "border-emerald-200 bg-white/70 dark:border-emerald-900 dark:bg-slate-950/60"
                        : "border-slate-200 bg-white/50 opacity-80 dark:border-slate-800 dark:bg-slate-950/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 text-xl text-white shadow">
                        {a.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold">
                          {a.title}{" "}
                          {a.unlockedAt && (
                            <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200">
                              unlocked
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{a.desc}</div>
                        {a.unlockedAt && (
                          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {new Date(a.unlockedAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardShell>

            <CardShell>
              <div className="text-lg font-semibold">Analytics (letzte 14 Tage)</div>

              <div className="mt-3 overflow-auto rounded-2xl border border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-950/60">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gradient-to-r from-sky-100 to-fuchsia-100 text-slate-700 dark:from-slate-900 dark:to-slate-900 dark:text-slate-200">
                    <tr>
                      <th className="p-3">Datum</th>
                      <th className="p-3">Gelernt</th>
                      <th className="p-3">Richtig</th>
                      <th className="p-3">Falsch</th>
                      <th className="p-3">Min</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {last14.map(({ day, s }) => (
                      <tr key={day}>
                        <td className="p-3">{day}</td>
                        <td className="p-3">{s.reviewed}</td>
                        <td className="p-3">{s.correct}</td>
                        <td className="p-3">{s.wrong}</td>
                        <td className="p-3">{s.minutes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                <Stat label="Total" value={totals.reviewed} />
                <Stat label="Richtig" value={totals.correct} />
                <Stat label="Falsch" value={totals.wrong} />
                <Stat label="Minuten" value={totals.minutes} />
              </div>
            </CardShell>
          </div>
        )}

        {/* ---------------- Settings ---------------- */}
        {view === "settings" && (
          <div className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">Settings</h2>

            <CardShell>
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm text-slate-600 dark:text-slate-400">Palette:</div>
                {(["ocean", "sunset", "lime", "grape"] as AppTheme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setPalette(t)}
                    className={`rounded-2xl border px-4 py-2 font-semibold shadow-sm hover:shadow ${
                      palette === t
                        ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900"
                        : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={exportJSON}
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
                >
                  Export (JSON)
                </button>
                <button
                  onClick={resetAll}
                  className="rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
                >
                  Reset (alles)
                </button>
              </div>

              <div className="mt-5">
                <div className="text-sm text-slate-500 dark:text-slate-400">Import (JSON)</div>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="mt-2 h-40 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  placeholder='{"decks":[...],"cards":[...],"profile":{...},"dailyStats":{...},"achievements":[...]}'
                />
                <button
                  onClick={importJSON}
                  className="mt-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
                >
                  Import aus Text
                </button>
              </div>
            </CardShell>

            <CardShell>
              <div className="text-lg font-semibold">Auto-Import (Tatoeba)</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Importiert zufällige <b>Satzkarten</b> (Front=Quellsatz, Back=Übersetzung). Requires{" "}
                <code className="px-1">/api/tatoeba</code> route.
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <select
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950"
                  value={importFrom}
                  onChange={(e) => setImportFrom(e.target.value)}
                >
                  {Object.keys(UI_TO_TATOEBA).map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>

                <span className="px-2 py-2 text-slate-600 dark:text-slate-400">→</span>

                <select
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950"
                  value={importTo}
                  onChange={(e) => setImportTo(e.target.value)}
                >
                  {Object.keys(UI_TO_TATOEBA).map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min={10}
                  max={200}
                  value={importCount}
                  onChange={(e) => setImportCount(Number(e.target.value))}
                  className="w-28 rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950"
                />

                <button
                  disabled={importing}
                  onClick={importFromTatoeba}
                  className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90 disabled:opacity-60"
                >
                  {importing ? "Import…" : "Import starten"}
                </button>
              </div>

              {importStatus && <div className="mt-3 text-sm text-slate-700 dark:text-slate-200">{importStatus}</div>}
            </CardShell>
          </div>
        )}
      </div>

      <BottomNav view={view} setView={setView} />
    </div>
  );
}

/** =========================================================
 * Practice component
 * ========================================================= */
function Practice({
  cards,
  onCorrect,
  onWrong,
  fromLang,
  toLang,
}: {
  cards: Card[];
  onCorrect: () => void;
  onWrong: () => void;
  fromLang: string;
  toLang: string;
}) {
  const vocab = cards.filter((c) => c.kind === "vocab");
  const sentences = cards.filter((c) => c.kind === "sentence");

  const [mode, setMode] = useState<"cloze" | "mc">("cloze");
  const [reveal, setReveal] = useState(false);
  const [currentId, setCurrentId] = useState<string>("");
  const [choiceCount, setChoiceCount] = useState<3 | 5>(5);
  const [feedback, setFeedback] = useState<null | { ok: boolean; correct: string }>(null);


  useEffect(() => {
    const pool = mode === "cloze" ? sentences : vocab;
    if (pool[0]) setCurrentId(pool[0].id);
    setReveal(false);
  }, [mode, sentences.length, vocab.length]);

  const current = useMemo(() => {
    const pool = mode === "cloze" ? sentences : vocab;
    return pool.find((x) => x.id === currentId) ?? pool[0];
  }, [mode, currentId, vocab, sentences]);

  if (!current) {
    return (
      <div className="mt-6 rounded-2xl border border-slate-200 bg-[var(--card)] p-6 dark:border-slate-800">
        <div className="text-xl font-semibold">Noch keine passenden Karten.</div>
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">Erstelle zuerst Karten im Tab “Decks”.</div>
      </div>
    );
  }

if (mode === "cloze") {
  const { cloze, answer } = makeCloze(current.front);

  // Optionen bauen: richtige Antwort + distractors aus anderen Sätzen/Wörtern
  const poolWords = [
    ...sentences.flatMap((s) =>
      s.front
        .split(/\s+/)
        .map((w) => w.replace(/[.,!?;:()"„“”“'’]/g, ""))
        .filter((w) => w.length >= 3)
    ),
    ...vocab.map((v) => v.front),
  ].filter(Boolean);

  const options = useMemo(() => {
    const choices = makeChoices(answer, poolWords, choiceCount);
    return choices;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.id, answer, choiceCount]);

  const goNext = () => {
    setFeedback(null);
    if (sentences.length > 1) setCurrentId(pickRandom(sentences).id);
  };

  return (
    <div className="mt-6 grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <ModeBtn active={mode === "cloze"} onClick={() => { setMode("cloze"); setFeedback(null); }} label="Wort wählen" />
          <ModeBtn active={mode === "mc"} onClick={() => { setMode("mc"); setFeedback(null); }} label="Multiple Choice" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 dark:text-slate-400">Optionen:</span>
          <button
            className={`rounded-2xl border px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 ${
              choiceCount === 3 ? "border-indigo-200 bg-indigo-50 dark:bg-slate-900" : "border-slate-200 bg-white dark:bg-slate-950"
            }`}
            onClick={() => setChoiceCount(3)}
          >
            3
          </button>
          <button
            className={`rounded-2xl border px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 ${
              choiceCount === 5 ? "border-indigo-200 bg-indigo-50 dark:bg-slate-900" : "border-slate-200 bg-white dark:bg-slate-950"
            }`}
            onClick={() => setChoiceCount(5)}
          >
            5
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-[var(--card)] p-6 shadow-sm dark:border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-slate-600 dark:text-slate-400">Wähle das passende Wort:</div>
          <div className="flex gap-2">
            <button
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
              onClick={() => speak(cloze, TTS_LANG[fromLang] ?? "de-DE")}
              title="Vorlesen"
            >
              🔊
            </button>
            <button
              className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950"
              onClick={stopSpeak}
              title="Stop"
            >
              ⏹
            </button>
          </div>
        </div>

        <div className="mt-3 text-2xl font-black">{cloze}</div>

        <div className="mt-5 grid gap-3">
          {options.map((opt) => (
            <button
              key={opt}
              disabled={!!feedback}
              className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-left font-semibold shadow-sm hover:shadow disabled:opacity-70 dark:border-slate-800 dark:bg-slate-950/60"
              onClick={() => {
                const ok = opt === answer;
                setFeedback({ ok, correct: answer });
                ok ? onCorrect() : onWrong();
                playTone(ok ? "good" : "bad");
                vibrate(ok ? 20 : 60);

                // optional: bei falsch die richtige Antwort kurz anzeigen, dann next
                setTimeout(() => goNext(), ok ? 300 : 900);
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <div
            className={`mt-4 rounded-2xl border p-4 ${
              feedback.ok
                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-900/20"
                : "border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-900/20"
            }`}
          >
            <div className="font-semibold">
              {feedback.ok ? "✅ Richtig!" : `❌ Falsch – richtig ist: ${feedback.correct}`}
            </div>
            <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">Übersetzung: {current.back}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
                onClick={() => speak(current.front, TTS_LANG[fromLang] ?? "de-DE")}
              >
                🔊 Satz
              </button>
              <button
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
                onClick={() => speak(current.back, TTS_LANG[toLang] ?? "en-US")}
              >
                🔊 Übersetzung
              </button>
              <button
                className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950"
                onClick={goNext}
              >
                Weiter →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

  // Multiple Choice
  const choices = useMemo(() => {
    const pool = vocab.map((v) => v.back);
    return makeChoices(current.back, pool, 4);
  }, [current.id, current.back, vocab]);

  return (
    <div className="mt-6 grid gap-4">
      <div className="flex flex-wrap gap-2">
        <ModeBtn active={mode === "cloze"} onClick={() => setMode("cloze")} label="Lückentext" />
        <ModeBtn active={mode === "mc"} onClick={() => setMode("mc")} label="Multiple Choice" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-[var(--card)] p-6 shadow-sm dark:border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-slate-600 dark:text-slate-400">Wähle die richtige Übersetzung:</div>
          <div className="flex gap-2">
            <button
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
              onClick={() => speak(current.front, TTS_LANG[fromLang] ?? "de-DE")}
              title="Vorlesen"
            >
              🔊
            </button>
            <button
              className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950"
              onClick={stopSpeak}
              title="Stop"
            >
              ⏹
            </button>
          </div>
        </div>

        <div className="mt-3 text-2xl font-black">{current.front}</div>

        <div className="mt-4 grid gap-3">
          {choices.map((c) => (
            <button
              key={c}
              className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-left font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950/60"
              onClick={() => {
                const ok = c === current.back;
                ok ? onCorrect() : onWrong();
                if (vocab.length > 1) setCurrentId(pickRandom(vocab).id);
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {(current.example || current.exampleTranslation) && (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="text-sm text-slate-600 dark:text-slate-300">Beispiel:</div>
            {current.example && <div className="mt-1 font-semibold">{current.example}</div>}
            {current.exampleTranslation && <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{current.exampleTranslation}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

/** =========================================================
 * UI Components
 * ========================================================= */
function Header({
  view,
  setView,
  activeDeck,
  dueCount,
  mode,
  toggleMode,
  level,
  xp,
}: {
  view: View;
  setView: (v: View) => void;
  activeDeck?: Deck;
  dueCount: number;
  mode: ThemeMode;
  toggleMode: () => void;
  level: number;
  xp: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-2xl font-black">
          <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-indigo-300 dark:to-fuchsia-300">
            SprachenlernApp
          </span>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {activeDeck ? (
            <>
              {activeDeck.name} · <b className="text-slate-900 dark:text-slate-100">{dueCount}</b> fällig
            </>
          ) : (
            "Kein Deck"
          )}
          {" · "}
          Level <b className="text-slate-900 dark:text-slate-100">{level}</b> ·{" "}
          <b className="text-slate-900 dark:text-slate-100">{xp}</b> XP
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <TopButton active={view === "learn"} onClick={() => setView("learn")} label="Lernen" />
        <TopButton active={view === "practice"} onClick={() => setView("practice")} label="Übungen" />
        <TopButton active={view === "decks"} onClick={() => setView("decks")} label="Decks" />
        <TopButton active={view === "profile"} onClick={() => setView("profile")} label="Profil" />
        <TopButton active={view === "settings"} onClick={() => setView("settings")} label="Settings" />

        <button
          onClick={toggleMode}
          className="ml-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950"
          title="Dark Mode umschalten"
        >
          {mode === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </div>
  );
}

function TopButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-4 py-2 font-semibold shadow-sm hover:shadow ${
        active ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
      }`}
    >
      {label}
    </button>
  );
}

function BottomNav({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 md:hidden">
      <div className="mx-auto grid max-w-5xl grid-cols-5 gap-1 p-2">
        <NavBtn active={view === "learn"} onClick={() => setView("learn")} label="Lernen" />
        <NavBtn active={view === "practice"} onClick={() => setView("practice")} label="Übungen" />
        <NavBtn active={view === "decks"} onClick={() => setView("decks")} label="Decks" />
        <NavBtn active={view === "profile"} onClick={() => setView("profile")} label="Profil" />
        <NavBtn active={view === "settings"} onClick={() => setView("settings")} label="Settings" />
      </div>
    </div>
  );
}

function NavBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-2 py-2 text-sm font-semibold shadow-sm ${
        active ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
      }`}
    >
      {label}
    </button>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-slate-200 bg-[var(--card)] p-5 shadow-sm dark:border-slate-800">{children}</div>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <div className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-sm font-semibold text-white shadow">{children}</div>;
}

function FancyBtn({ variant, onClick, label }: { variant: "good" | "bad"; onClick: () => void; label: string }) {
  const cls = variant === "good" ? "from-emerald-500 to-teal-500" : "from-rose-500 to-orange-500";
  return (
    <button onClick={onClick} className={`rounded-2xl bg-gradient-to-r ${cls} px-4 py-3 font-semibold text-white shadow hover:opacity-90`}>
      {label}
    </button>
  );
}

function Stat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
      <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-black bg-gradient-to-r from-sky-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-sky-300 dark:to-fuchsia-300">
        {value}
        {suffix ? <span className="ml-1 text-base font-semibold">{suffix}</span> : null}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
      <div className="text-xl font-semibold">Keine fälligen Karten 🎉</div>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">Geh zu “Decks” und füge neue Karten hinzu, oder übe im Tab “Übungen”.</div>
    </div>
  );
}

function ModeBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-4 py-2 font-semibold ${active ? "bg-indigo-50 dark:bg-slate-900" : "bg-white dark:bg-slate-950"} border-slate-200 shadow-sm hover:shadow dark:border-slate-800`}
    >
      {label}
    </button>
  );
}
