"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { loadLanguagePack } from "@/lib/loadLanguagePack";

/** ===========================================
 *  SprachenlernApp – Auto-Language Mode
 *  Tabs: Heute | Übungen | Profil | Settings
 *  - User wählt nur Lernsprache (Target)
 *  - Content wird automatisch aus Starter-Packs gefüllt (offline)
 *  - SRS + Übungen (nur klicken)
 *  - Fortschritt/Analytics pro Sprache
 *  - TTS + Success/Fail Sound + Vibrate
 * =========================================== */

type View = "today" | "practice" | "profile" | "settings";
type ThemeMode = "light" | "dark";
type AppTheme = "ocean" | "sunset" | "lime" | "grape";

type Lang = "EN" | "ES" | "FR" | "RU";
type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
type CardKind = "vocab" | "sentence";

type Card = {
  id: string;
  targetLang: Lang;
  kind: CardKind;
  front: string; // source/native (DE)
  back: string;  // target
  example?: string;
  exampleTranslation?: string;

  due: number;
  intervalDays: number;
  ease: number;
  lapses: number;
  lastReviewed?: number;
};

type DailyStat = { reviewed: number; correct: number; wrong: number; minutes: number };

type Profile = {
  username: string;
  nativeLang: "DE";
  targetLang: Lang;
  level: Level;
  dailyGoal: number;
  xp: number;
  streak: number;
  bestStreak: number;
  lastActiveDay: string; // YYYY-MM-DD
  createdAt: number;
};

type Achievement = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  unlockedAt?: number;
};

type AppData = {
  cards: Card[];
  profile: Profile;
  achievements: Achievement[];
  dailyStatsByLang: Record<Lang, Record<string, DailyStat>>;
};

const STORAGE_KEY = "sprachapp_auto_v1";
const THEME_KEY = "sprachapp_theme_mode_v1";
const PALETTE_KEY = "sprachapp_palette_v1";

const THEME_CLASS: Record<AppTheme, string> = {
  ocean: "theme-ocean",
  sunset: "theme-sunset",
  lime: "theme-lime",
  grape: "theme-grape",
};

const TTS_LANG: Record<Lang | "DE", string> = {
  DE: "de-DE",
  EN: "en-US",
  ES: "es-ES",
  FR: "fr-FR",
  RU: "ru-RU",
};

// In deiner Haupt-Komponente (App oder Page)
const [isDownloading, setIsDownloading] = useState(false);

/** ---------- Helpers ---------- */
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
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = new Date(ay, am - 1, ad).getTime();
  const db = new Date(by, bm - 1, bd).getTime();
  return Math.round((db - da) / (24 * 60 * 60 * 1000));
}

/** ---------- SRS (light) ---------- */
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

/** ---------- Practice helpers (word-choice cloze) ---------- */
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

/** ---------- Audio feedback ---------- */
function playTone(type: "good" | "bad") {
  if (typeof window === "undefined") return;
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";

  const now = ctx.currentTime;
  if (type === "good") {
    o.frequency.setValueAtTime(784, now);
    o.frequency.exponentialRampToValueAtTime(1046.5, now + 0.12);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.15, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(now);
    o.stop(now + 0.2);
  } else {
    o.frequency.setValueAtTime(220, now);
    o.frequency.exponentialRampToValueAtTime(155, now + 0.18);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(now);
    o.stop(now + 0.24);
  }

  setTimeout(() => ctx.close().catch(() => {}), 400);
}
function vibrate(ms: number) {
  if (typeof window === "undefined") return;
  navigator.vibrate?.(ms);
}

/** ---------- Robust TTS voice picking ---------- */
function speak(text: string, lang?: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  const targetLang = lang || "en-US";

  function pickVoiceAndSpeak() {
    const voices = synth.getVoices();
    if (!voices.length) return;

    const primary = targetLang.split("-")[0].toLowerCase();
    const voice =
      voices.find((v) => v.lang?.toLowerCase() === targetLang.toLowerCase()) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith(primary)) ||
      voices[0];

    if (voice) utter.voice = voice;
    utter.lang = voice?.lang || targetLang;

    synth.cancel();
    synth.speak(utter);
  }

  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = pickVoiceAndSpeak;
  } else {
    pickVoiceAndSpeak();
  }
}
function stopSpeak() {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
}

/** ---------- Gamification ---------- */
function xpForLevel(level: number) {
  return Math.round(100 * Math.pow(level, 1.2));
}
function computeLevelFromXp(totalXp: number) {
  let lvl = 1;
  let xp = totalXp;
  while (xp >= xpForLevel(lvl) && lvl < 200) {
    xp -= xpForLevel(lvl);
    lvl += 1;
  }
  const need = xpForLevel(lvl);
  const progress = need === 0 ? 0 : clamp(xp / need, 0, 1);
  return { level: lvl, xpIntoLevel: xp, xpNeed: need, progress };
}
function addXp(profile: Profile, amount: number) {
  const newXp = Math.max(0, profile.xp + amount);
  const { level } = computeLevelFromXp(newXp);
  return { ...profile, xp: newXp, /* derived */ lastActiveDay: profile.lastActiveDay, streak: profile.streak, bestStreak: profile.bestStreak, level };
}
function defaultAchievements(): Achievement[] {
  return [
    { id: "first10", title: "Erste Schritte", desc: "Lerne 10 Karten", icon: "✨" },
    { id: "streak3", title: "Konsequent", desc: "3 Tage Streak", icon: "🔥" },
    { id: "streak7", title: "Eine Woche", desc: "7 Tage Streak", icon: "🏅" },
    { id: "review100", title: "Hundert", desc: "Lerne 100 Karten", icon: "💯" },
    { id: "perfect20day", title: "Sauber!", desc: "20 richtige an einem Tag", icon: "🎯" },
    { id: "nightowl", title: "Night Owl", desc: "Lerne nach 23:00", icon: "🌙" },
  ];
}

/** ---------- Data load/save ---------- */
function loadData(): AppData {
  const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  if (raw) return JSON.parse(raw) as AppData;

  const now = Date.now();
  const prof: Profile = {
    username: "Learner",
    nativeLang: "DE",
    targetLang: "EN",
    level: "BEGINNER",
    dailyGoal: 20,
    xp: 0,
    streak: 0,
    bestStreak: 0,
    lastActiveDay: todayKey(),
    createdAt: now,
  };

  return {
    cards: [], 
    profile: prof,
    achievements: defaultAchievements(),
    dailyStatsByLang: { EN: {}, ES: {}, FR: {}, RU: {} },
  };
}

function saveData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** ---------- Seeding logic (auto content) ---------- */
function seedCardsFromDownloadedPack(rawCards: any[], level: Level, maxCards: number) {
  const now = Date.now();

  // 1. Trenne die geladenen Karten in Vokabeln und Sätze
  const allVocabs = rawCards.filter(c => c.kind === "vocab");
  const allSentences = rawCards.filter(c => c.kind === "sentence");

  // 2. Berechne das Verhältnis basierend auf dem Level
  // Anfänger: mehr Vokabeln | Fortgeschrittene: mehr Sätze
  const vocabRatio = level === "BEGINNER" ? 0.7 : level === "INTERMEDIATE" ? 0.55 : 0.45;
  const vocabCount = Math.round(maxCards * vocabRatio);
  const sentCount = maxCards - vocabCount;

  // 3. Wähle die entsprechende Anzahl aus und füge SRS-Daten hinzu
  const selectedVocabs = allVocabs.slice(0, vocabCount).map((v) => ({
    ...v,
    due: now,
    intervalDays: 0,
    ease: 2.5,
    lapses: 0,
  }));

  const selectedSents = allSentences.slice(0, sentCount).map((s) => ({
    ...s,
    due: now,
    intervalDays: 0,
    ease: 2.5,
    lapses: 0,
  }));

  return [...selectedVocabs, ...selectedSents];
}

/** ===========================================
 * Page
 * =========================================== */
export default function Page() {
  const [data, setData] = useState<AppData>(() => loadData());
  const [view, setView] = useState<View>("today");

  const [mode, setMode] = useState<ThemeMode>("light");
  const [palette, setPalette] = useState<AppTheme>("ocean");

  const sessionStartRef = useRef<number>(Date.now());

  useEffect(() => saveData(data), [data]);

  /** theme init */
  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as ThemeMode | null) ?? "light";
    setMode(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);
  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  /** palette init */
  useEffect(() => {
    const saved = (localStorage.getItem(PALETTE_KEY) as AppTheme | null) ?? "ocean";
    setPalette(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem(PALETTE_KEY, palette);
    Object.values(THEME_CLASS).forEach((cls) => document.documentElement.classList.remove(cls));
    document.documentElement.classList.add(THEME_CLASS[palette]);
  }, [palette]);

  /** streak day rollover */
  useEffect(() => {
    const today = todayKey();
    setData((prev) => {
      const p = prev.profile;
      const delta = diffDays(p.lastActiveDay, today);
      if (delta <= 0) return prev;
      // if missed days => reset streak (we keep it simple)
      if (delta >= 2) return { ...prev, profile: { ...p, streak: 0, lastActiveDay: today } };
      return { ...prev, profile: { ...p, lastActiveDay: today } };
    });
  }, []);

  const target = data.profile.targetLang;

  /** ensure we always have some cards for selected language */
  useEffect(() => {
    const has = data.cards.some((c) => c.targetLang === target);
    if (has) return;

    setData((prev) => ({
      ...prev,
      cards: [...seedCardsFromPack(prev.profile.targetLang, prev.profile.level, 30), ...prev.cards],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const allCardsForLang = useMemo(() => data.cards.filter((c) => c.targetLang === target), [data.cards, target]);

  const dueCards = useMemo(() => {
    const now = Date.now();
    return allCardsForLang.filter((c) => c.due <= now).sort((a, b) => a.due - b.due);
  }, [allCardsForLang]);

  const nextCard = dueCards[0];

  const todayStat = useMemo(() => {
    const k = todayKey();
    return data.dailyStatsByLang[target]?.[k] ?? { reviewed: 0, correct: 0, wrong: 0, minutes: 0 };
  }, [data.dailyStatsByLang, target]);

  function addMinutesSinceLastTick() {
    const now = Date.now();
    const elapsed = now - sessionStartRef.current;
    if (elapsed < 30_000) return 0;
    const minutes = Math.floor(elapsed / 60_000);
    if (minutes <= 0) return 0;
    sessionStartRef.current = now;
    return minutes;
  }

  function bumpStats(correct: boolean) {
    const k = todayKey();
    const addMin = addMinutesSinceLastTick();

    setData((prev) => {
      const byLang = { ...prev.dailyStatsByLang };
      const langMap = { ...(byLang[target] ?? {}) };
      const cur = langMap[k] ?? { reviewed: 0, correct: 0, wrong: 0, minutes: 0 };
      langMap[k] = {
        reviewed: cur.reviewed + 1,
        correct: cur.correct + (correct ? 1 : 0),
        wrong: cur.wrong + (correct ? 0 : 1),
        minutes: cur.minutes + addMin,
      };
      byLang[target] = langMap;
      return { ...prev, dailyStatsByLang: byLang };
    });
  }

  function updateStreakIfGoalMet(nextReviewed: number) {
    const today = todayKey();
    setData((prev) => {
      const p = prev.profile;
      if (nextReviewed < p.dailyGoal) return prev;

      // if already "counted today", no extra action
      if (p.lastActiveDay === today && p.streak > 0) {
        return { ...prev, profile: { ...p, bestStreak: Math.max(p.bestStreak, p.streak), lastActiveDay: today } };
      }

      const delta = diffDays(p.lastActiveDay, today);
      let streak = p.streak;
      if (delta === 0) streak = p.streak;
      else if (delta === 1) streak = p.streak + 1;
      else streak = 1;

      return { ...prev, profile: { ...p, streak, bestStreak: Math.max(p.bestStreak, streak), lastActiveDay: today } };
    });
  }

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
    const k = todayKey();
    const t = data.dailyStatsByLang[target]?.[k] ?? { reviewed: 0, correct: 0, wrong: 0, minutes: 0 };

    const totalReviewedAllLang = (Object.values(data.dailyStatsByLang) as any[]).flatMap((m) => Object.values(m)).reduce((s: number, d: any) => s + (d.reviewed || 0), 0);

    if (totalReviewedAllLang >= 10) unlockAchievement("first10");
    if (totalReviewedAllLang >= 100) unlockAchievement("review100");
    if (data.profile.streak >= 3) unlockAchievement("streak3");
    if (data.profile.streak >= 7) unlockAchievement("streak7");
    if (t.correct >= 20) unlockAchievement("perfect20day");
    if (new Date().getHours() >= 23) unlockAchievement("nightowl");
  }

  useEffect(() => {
    evaluateAchievements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.dailyStatsByLang, data.profile.streak, data.profile.targetLang]);

  /** learned definitions */
  const learnedThreshold = 3; // days
  const masteredThreshold = 7;

  const learned = useMemo(() => {
    const vocabLearned = allCardsForLang.filter((c) => c.kind === "vocab" && c.intervalDays >= learnedThreshold).length;
    const vocabMastered = allCardsForLang.filter((c) => c.kind === "vocab" && c.intervalDays >= masteredThreshold).length;
    const sentLearned = allCardsForLang.filter((c) => c.kind === "sentence" && c.intervalDays >= learnedThreshold).length;
    const total = allCardsForLang.length || 1;
    const learnedTotal = vocabLearned + sentLearned;
    return { vocabLearned, vocabMastered, sentLearned, learnedTotal, total, progress: clamp(learnedTotal / total, 0, 1) };
  }, [allCardsForLang]);

  const goalProgress = clamp(todayStat.reviewed / Math.max(1, data.profile.dailyGoal), 0, 1);
  const goalMet = todayStat.reviewed >= data.profile.dailyGoal;

  const levelInfo = useMemo(() => computeLevelFromXp(data.profile.xp), [data.profile.xp]);

  const last14 = useMemo(() => {
    const days: { day: string; s: DailyStat }[] = [];
    const base = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(base);
      d.setDate(d.getDate() - i);
      const key = todayKey(d);
      const s = data.dailyStatsByLang[target]?.[key] ?? { reviewed: 0, correct: 0, wrong: 0, minutes: 0 };
      days.push({ day: key, s });
    }
    return days;
  }, [data.dailyStatsByLang, target]);

  const totalsLang = useMemo(() => {
    const all = Object.values(data.dailyStatsByLang[target] ?? {});
    const reviewed = all.reduce((a, x) => a + (x.reviewed || 0), 0);
    const correct = all.reduce((a, x) => a + (x.correct || 0), 0);
    const wrong = all.reduce((a, x) => a + (x.wrong || 0), 0);
    const minutes = all.reduce((a, x) => a + (x.minutes || 0), 0);
    const acc = reviewed ? Math.round((correct / reviewed) * 100) : 0;
    return { reviewed, correct, wrong, minutes, acc };
  }, [data.dailyStatsByLang, target]);

  /** main review */
function review(correct: boolean) {
  if (!nextCard) return;

  playTone(correct ? "good" : "bad");
  vibrate(correct ? 20 : 60);

  // Stats in der Datenbank/API (falls synchron)
  bumpStats(correct);

  setData((prev) => {
    // 1. XP für die aktuelle Antwort berechnen
    let updatedProfile = addXp(prev.profile, correct ? 10 : 3) as unknown as Profile;
    
    // 2. Karten-Status (Scheduling) aktualisieren
    const updatedCards = prev.cards.map((c) =>
      c.id === nextCard.id ? schedule(c, correct) : c
    );

    // 3. Session-Bonus prüfen (alle 20 Karten)
    const nextReviewed = (todayStat.reviewed || 0) + 1;
    if (nextReviewed > 0 && nextReviewed % 20 === 0) {
      updatedProfile = addXp(updatedProfile, 20) as unknown as Profile;
    }

    // Alles in einem Rutsch zurückgeben
    return {
      ...prev,
      profile: updatedProfile,
      cards: updatedCards,
    } as AppData;
  });

  // Streak-Logik außerhalb des Setters (da sie meist Seiteneffekte hat)
  updateStreakIfGoalMet(todayStat.reviewed + 1);
}

async function downloadAndAddPack() {
  try {
    setIsDownloading(true);
    const targetLang = data.profile.targetLang;
    const userLevel = data.profile.level;

    // 1. Pack laden (GitHub -> IndexedDB -> Cache)
    const rawCards = await loadLanguagePack(targetLang);
    const allCards = rawCards as any[];

    setData((prev) => {
      // 2. Dubletten-Check
      const existingIds = new Set(prev.cards.map((c) => c.id));
      const availableCards = allCards.filter((c) => !existingIds.has(c.id));

      if (availableCards.length === 0) {
        alert("Du hast bereits alle verfügbaren Karten für diese Sprache geladen.");
        return prev;
      }

      // 3. Level-Logik: Wie viele Vokabeln vs. Sätze?
      // Anfänger: 70% Vokabeln | Fortgeschritten: 45% Vokabeln
      const maxToLoad = 25; // Wie viele Karten pro Klick geladen werden sollen
      const vocabRatio = userLevel === "BEGINNER" ? 0.7 : userLevel === "INTERMEDIATE" ? 0.55 : 0.45;
      
      const targetVocabCount = Math.round(maxToLoad * vocabRatio);
      const targetSentCount = maxToLoad - targetVocabCount;

      const newVocabs = availableCards.filter(c => c.kind === "vocab").slice(0, targetVocabCount);
      const newSents = availableCards.filter(c => c.kind === "sentence").slice(0, targetSentCount);
      
      const selectedCards = [...newVocabs, ...newSents];

      // 4. Initialisieren mit SRS-Werten
      const initializedCards: Card[] = selectedCards.map((c) => ({
        ...c,
        due: Date.now(),
        intervalDays: 0,
        ease: 2.5,
        lapses: 0,
      }));

      return { 
        ...prev, 
        cards: [...initializedCards, ...prev.cards] 
      };
    });

    alert(`Neue Inhalte für ${targetLang} wurden deinem Stapel hinzugefügt!`);
  } catch (err) {
    console.error(err);
    alert("Fehler beim Herunterladen. Bitte prüfe die Internetverbindung.");
  } finally {
    setIsDownloading(false);
  }
}

  /** UI */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg1)] via-[var(--bg2)] to-[var(--bg3)] text-slate-900 dark:text-slate-50">
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-6">
        <Header
          view={view}
          setView={setView}
          mode={mode}
          toggleMode={() => setMode((t) => (t === "dark" ? "light" : "dark"))}
          level={data.profile.level}
          xp={data.profile.xp}
          targetLang={target}
          streak={data.profile.streak}
        />

        {view === "today" && (
          <div className="mt-6 grid gap-4">
            <CardShell>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Lernsprache</div>
                  <div className="text-lg font-semibold">Deutsch → {target}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    <b className="text-slate-900 dark:text-slate-100">{dueCards.length}</b> fällig ·{" "}
                    <b className="text-slate-900 dark:text-slate-100">{todayStat.reviewed}</b> heute ·{" "}
                    <b className="text-slate-900 dark:text-slate-100">{data.profile.streak}</b>🔥 Streak
                  </div>
                </div>
                <Pill>{goalMet ? "✅ Ziel" : `${data.profile.dailyGoal} / Tag`}</Pill>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Tagesziel</span>
                  <span>
                    {todayStat.reviewed}/{data.profile.dailyGoal}
                  </span>
                </div>
                <div className="mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50">
                  <div className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${Math.round(goalProgress * 100)}%` }} />
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>Sprach-Fortschritt (gelernt)</span>
                    <span>
                      {learned.learnedTotal}/{learned.total}
                    </span>
                  </div>
                  <div className="mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50">
                    <div className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" style={{ width: `${Math.round(learned.progress * 100)}%` }} />
                  </div>
                  <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                    Gelernte Wörter: <b>{learned.vocabLearned}</b> (Mastered: <b>{learned.vocabMastered}</b>) · Gelernte Sätze: <b>{learned.sentLearned}</b>
                  </div>
                </div>
              </div>
            </CardShell>

            <CardShell>
              {!nextCard ? (
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="text-xl font-semibold">Keine fälligen Karten 🎉</div>
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">Du kannst neue Karten nachlegen (offline Starter-Pack).</div>
                  <div className="mt-4 flex justify-center gap-2">
                    <button
                      onClick={downloadAndAddPack}
                      disabled={isDownloading}
                      className={`rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 font-bold text-white shadow-lg transition-all active:scale-95 ${
                        isDownloading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                      }`}
                    >
                      {isDownloading ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">🌀</span> Lade {data.profile.targetLang} Pack...
                        </span>
                      ) : (
                        `📥 Download ${data.profile.targetLang} Pack (GitHub)`
                      )}
                    </button>
                    <button
                      onClick={() => setView("practice")}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950"
                    >
                      Übungen →
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Karte · <b className="text-slate-900 dark:text-slate-100">{nextCard.kind === "vocab" ? "Vokabel" : "Satz"}</b>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
                        onClick={() => speak(nextCard.front, TTS_LANG.DE)}
                        title="DE vorlesen"
                      >
                        🔊 DE
                      </button>
                      <button
                        className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
                        onClick={() => speak(nextCard.back, TTS_LANG[target])}
                        title={`${target} vorlesen`}
                      >
                        🔊 {target}
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

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-[var(--cardSolid)] p-5 shadow-sm dark:border-slate-800">
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Deutsch</div>
                      <div className="mt-2 text-2xl font-black">{nextCard.front}</div>
                      {nextCard.example && (
                        <div className="mt-3 rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm dark:border-slate-800 dark:bg-slate-950/60">
                          <div className="font-semibold">{nextCard.example}</div>
                          {nextCard.exampleTranslation && <div className="mt-1 text-slate-600 dark:text-slate-300">{nextCard.exampleTranslation}</div>}
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-[var(--cardSolid)] p-5 shadow-sm dark:border-slate-800">
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{target}</div>
                      <div className="mt-2 text-2xl font-black bg-gradient-to-r from-sky-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-sky-300 dark:to-fuchsia-300">
                        {nextCard.back}
                      </div>
                      <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        Intervall: <b className="text-slate-900 dark:text-slate-100">{nextCard.intervalDays}d</b> · Ease:{" "}
                        <b className="text-slate-900 dark:text-slate-100">{nextCard.ease.toFixed(2)}</b>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <FancyBtn variant="bad" onClick={() => review(false)} label="✖ Nicht gewusst" />
                    <FancyBtn variant="good" onClick={() => review(true)} label="✔ Gewusst" />
                  </div>
                </>
              )}
            </CardShell>

            <CardShell>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Heute ({target})</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Accuracy: <b className="text-slate-900 dark:text-slate-100">{todayStat.reviewed ? Math.round((todayStat.correct / todayStat.reviewed) * 100) : 0}%</b> · Minuten:{" "}
                    <b className="text-slate-900 dark:text-slate-100">{todayStat.minutes}</b>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/60 px-4 py-2 text-sm font-semibold dark:border-slate-800 dark:bg-slate-950/60">
                  Level <span className="font-black">{computeLevelFromXp(data.profile.xp).level}</span>
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
                  <div className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" style={{ width: `${Math.round(levelInfo.progress * 100)}%` }} />
                </div>
              </div>
            </CardShell>
          </div>
        )}

{view === "practice" && (
  <Practice
    targetLang={target}
    nativeLang="DE"
    cards={allCardsForLang}
    onCorrect={() => {
      playTone("good");
      vibrate(20);
      bumpStats(true);
      // Fix: Gesamtes Objekt als AppData casten, um den Level-Typen-Fehler zu umgehen
      setData((prev) => ({ 
        ...prev, 
        profile: addXp(prev.profile, 6) as unknown as Profile 
      } as AppData));
      updateStreakIfGoalMet(todayStat.reviewed + 1);
    }}
    onWrong={() => {
      playTone("bad");
      vibrate(60);
      bumpStats(false);
      // Fix: Auch hier den Double Cast anwenden
      setData((prev) => ({ 
        ...prev, 
        profile: addXp(prev.profile, 2) as unknown as Profile 
      } as AppData));
      updateStreakIfGoalMet(todayStat.reviewed + 1);
    }}
  />
)}

        {view === "profile" && (
          <div className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">Profil & Fortschritt ({target})</h2>

            <CardShell>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 font-black text-white shadow">
                    {data.profile.username.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{data.profile.username}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Deutsch → {target} · Level <b className="text-slate-900 dark:text-slate-100">{computeLevelFromXp(data.profile.xp).level}</b> ·{" "}
                      <b className="text-slate-900 dark:text-slate-100">{data.profile.xp}</b> XP
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

              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                <Stat label="Streak" value={data.profile.streak} suffix="🔥" />
                <Stat label="Best" value={data.profile.bestStreak} suffix="🏆" />
                <Stat label="Acc" value={totalsLang.acc} suffix="%" />
                <Stat label="Minuten" value={totalsLang.minutes} />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Sprach-Fortschritt</span>
                  <span>{Math.round(learned.progress * 100)}%</span>
                </div>
                <div className="mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50">
                  <div className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${Math.round(learned.progress * 100)}%` }} />
                </div>
                <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                  Gelernte Wörter: <b>{learned.vocabLearned}</b> (Mastered: <b>{learned.vocabMastered}</b>) · Gelernte Sätze: <b>{learned.sentLearned}</b>
                </div>
              </div>
            </CardShell>

            <CardShell>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">Achievements</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Freigeschaltet: <b className="text-slate-900 dark:text-slate-100">{data.achievements.filter((a) => a.unlockedAt).length}</b> / {data.achievements.length}
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
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 text-xl text-white shadow">{a.icon}</div>
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
                        {a.unlockedAt && <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{new Date(a.unlockedAt).toLocaleString()}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardShell>

            <CardShell>
              <div className="text-lg font-semibold">Analytics – letzte 14 Tage ({target})</div>

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
            </CardShell>
          </div>
        )}

        {view === "settings" && (
          <div className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">Settings</h2>

            <CardShell>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Lernsprache</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["EN", "ES", "FR", "RU"] as Lang[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setData((prev) => ({ ...prev, profile: { ...prev.profile, targetLang: l } }));
                          // if no cards exist for that language, seed immediately
                          setTimeout(() => {
                            setData((prev) => {
                              const has = prev.cards.some((c) => c.targetLang === l);
                              if (has) return prev;
                              return { ...prev, cards: [...seedCardsFromPack(l, prev.profile.level, 30), ...prev.cards] };
                            });
                          }, 0);
                        }}
                        className={`rounded-2xl border px-4 py-2 font-semibold shadow-sm hover:shadow ${
                          target === l ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Deutsch ist aktuell die Muttersprache (DE).</div>
                </div>

                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Level</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["BEGINNER", "INTERMEDIATE", "ADVANCED"] as Level[]).map((lv) => (
                      <button
                        key={lv}
                        onClick={() => setData((prev) => ({ ...prev, profile: { ...prev.profile, level: lv } }))}
                        className={`rounded-2xl border px-4 py-2 font-semibold shadow-sm hover:shadow ${
                          data.profile.level === lv ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                        }`}
                      >
                        {lv === "BEGINNER" ? "Beginner" : lv === "INTERMEDIATE" ? "Intermediate" : "Advanced"}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Level steuert nur die Mischung (mehr Wörter vs. mehr Sätze).</div>
                </div>

                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Tagesziel</div>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="number"
                      min={5}
                      max={200}
                      value={data.profile.dailyGoal}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, profile: { ...prev.profile, dailyGoal: clamp(Number(e.target.value), 5, 200) } }))
                      }
                      className="w-32 rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950"
                    />
                    <div className="self-center text-sm text-slate-600 dark:text-slate-400">Karten / Tag</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Content</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={downloadAndAddPack}
                      disabled={isDownloading}
                      className={`rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 font-bold text-white shadow-lg transition-all active:scale-95 ${
                        isDownloading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                      }`}
                    >
                      {isDownloading ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">🌀</span> Lade {data.profile.targetLang} Pack...
                        </span>
                      ) : (
                        `📥 Download ${data.profile.targetLang} Pack (GitHub)`
                      )}
                    </button>
                    <button
                      onClick={() => {
                        if (!confirm("Alles zurücksetzen?")) return;
                        const fresh = loadData();
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
                        setData(fresh);
                        setView("today");
                      }}
                      className="rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Nächster Schritt: “Download Packs” (online laden → offline speichern). Kann ich dir als nächstes direkt einbauen.
                  </div>
                </div>
              </div>
            </CardShell>

            <CardShell>
              <div className="text-sm text-slate-600 dark:text-slate-400">Palette</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["ocean", "sunset", "lime", "grape"] as AppTheme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setPalette(t)}
                    className={`rounded-2xl border px-4 py-2 font-semibold shadow-sm hover:shadow ${
                      palette === t ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </CardShell>
          </div>
        )}
      </div>

      <BottomNav view={view} setView={setView} />
    </div>
  );
}

/** ===========================================
 * Practice (no typing, only choosing)
 * =========================================== */
function Practice({
  cards,
  targetLang,
  nativeLang,
  onCorrect,
  onWrong,
}: {
  cards: Card[];
  targetLang: Lang;
  nativeLang: "DE";
  onCorrect: () => void;
  onWrong: () => void;
}) {
  const vocab = cards.filter((c) => c.kind === "vocab");
  const sentences = cards.filter((c) => c.kind === "sentence");

  const [mode, setMode] = useState<"wordpick" | "mc">("wordpick");
  const [choiceCount, setChoiceCount] = useState<3 | 5>(5);
  const [currentId, setCurrentId] = useState<string>("");
  const [feedback, setFeedback] = useState<null | { ok: boolean; correct: string }>(null);

  // Initialisierung & Pool-Wechsel
  useEffect(() => {
    const pool = mode === "wordpick" ? sentences : vocab;
    if (pool.length > 0) setCurrentId(pool[0].id);
    setFeedback(null);
  }, [mode, sentences.length, vocab.length]);

  const current = useMemo(() => {
    const pool = mode === "wordpick" ? sentences : vocab;
    return pool.find((x) => x.id === currentId) ?? pool[0];
  }, [mode, currentId, vocab, sentences]);

  // Hilfsvariablen für Cloze (nur wenn im wordpick Modus)
  const clozeData = useMemo(() => {
    if (mode === "wordpick" && current) return makeCloze(current.front);
    return { cloze: "", answer: "" };
  }, [current, mode]);

  // Nächste Karte wählen
  const goNext = () => {
    setFeedback(null);
    const pool = mode === "wordpick" ? sentences : vocab;
    if (pool.length > 1) {
      const otherCards = pool.filter((c) => c.id !== current?.id);
      setCurrentId(otherCards[Math.floor(Math.random() * otherCards.length)].id);
    }
  };

  // Antwort-Optionen generieren
  const options = useMemo(() => {
    if (!current) return [];
    if (mode === "wordpick") {
      const poolWords = [
        ...sentences.flatMap((s) => s.front.split(/\s+/).map((w) => w.replace(/[.,!?;:()]/g, ""))),
        ...vocab.map((v) => v.front),
      ].filter((w) => w.length >= 3);
      return makeChoices(clozeData.answer, poolWords, choiceCount);
    } else {
      const poolBacks = vocab.map((v) => v.back);
      return makeChoices(current.back, poolBacks, choiceCount);
    }
  }, [current, mode, clozeData.answer, vocab, sentences, choiceCount]);

  if (!current) {
    return (
      <div className="mt-6 rounded-2xl border border-slate-200 bg-[var(--card)] p-6 text-center">
        <div className="text-xl font-semibold">Keine passenden Karten gefunden.</div>
        <p className="text-sm text-slate-500">Füge Karten für diesen Modus hinzu.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 animate-in fade-in duration-500">
      {/* Header: Modus & Optionen */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <ModeBtn active={mode === "wordpick"} onClick={() => { setMode("wordpick"); setFeedback(null); }} label="Wort wählen" />
          <ModeBtn active={mode === "mc"} onClick={() => { setMode("mc"); setFeedback(null); }} label="Multiple Choice" />
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <SmallToggle active={choiceCount === 3} onClick={() => setChoiceCount(3)} label="3" />
          <SmallToggle active={choiceCount === 5} onClick={() => setChoiceCount(5)} label="5" />
        </div>
      </div>

      {/* Die Lernkarte */}
      <div className="rounded-3xl border border-slate-200 bg-[var(--card)] p-6 shadow-xl dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {mode === "wordpick" ? "Satz vervollständigen" : "Übersetzung wählen"}
          </div>
          <div className="flex gap-2">
             <button className="rounded-xl bg-slate-100 dark:bg-slate-800 p-2 text-sm" onClick={() => speak(current.front, TTS_LANG[nativeLang])}>🔊 DE</button>
             <button className="rounded-xl bg-slate-100 dark:bg-slate-800 p-2 text-sm" onClick={() => speak(current.back, TTS_LANG[targetLang])}>🔊 {targetLang}</button>
          </div>
        </div>

        {/* Die Frage */}
        <div className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-8">
          {mode === "wordpick" ? clozeData.cloze : current.front}
        </div>

        {/* Antwortmöglichkeiten */}
        <div className="grid gap-3">
          {options.map((opt) => (
            <button
              key={opt}
              disabled={!!feedback}
              onClick={() => {
                const isCorrect = mode === "wordpick" ? opt === clozeData.answer : opt === current.back;
                setFeedback({ ok: isCorrect, correct: mode === "wordpick" ? clozeData.answer : current.back });
                isCorrect ? onCorrect() : onWrong();
                if (isCorrect) setTimeout(goNext, 600);
              }}
              className={`p-4 text-left rounded-2xl border-2 font-bold transition-all ${
                feedback?.correct === opt 
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" 
                  : feedback && opt !== feedback.correct
                  ? "opacity-40 border-slate-100 dark:border-slate-900"
                  : "border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 hover:border-indigo-500 shadow-sm"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Feedback bei Fehlern */}
        {feedback && !feedback.ok && (
          <div className="mt-6 p-5 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-900 animate-in slide-in-from-top-2">
            <div className="text-rose-600 dark:text-rose-400 font-black mb-1">❌ Fast! Richtig ist:</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white underline">{feedback.correct}</div>
            <div className="mt-2 text-sm italic text-slate-500">"{current.back}"</div>
            <button onClick={goNext} className="mt-4 w-full py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold shadow-lg">
              Weiter →
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Multiple Choice: choose correct translation
  const choices = useMemo(() => {
    const pool = vocab.map((v) => v.back);
    return makeChoices(current.back, pool, 4);
  }, [current.id, current.back, vocab]);

  return (
    <div className="mt-6 grid gap-4">
      <div className="flex flex-wrap gap-2">
        <ModeBtn active={mode === "wordpick"} onClick={() => { setMode("wordpick"); setFeedback(null); }} label="Wort wählen" />
        <ModeBtn active={mode === "mc"} onClick={() => { setMode("mc"); setFeedback(null); }} label="Multiple Choice" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-[var(--card)] p-6 shadow-sm dark:border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-slate-600 dark:text-slate-400">Wähle die richtige Übersetzung:</div>
          <div className="flex gap-2">
            <button
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
              onClick={() => speak(current.front, TTS_LANG[nativeLang])}
              title="Vorlesen (DE)"
            >
              🔊 DE
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

/** ===========================================
 * UI
 * =========================================== */
function Header({
  view,
  setView,
  mode,
  toggleMode,
  level,
  xp,
  targetLang,
  streak,
}: {
  view: View;
  setView: (v: View) => void;
  mode: ThemeMode;
  toggleMode: () => void;
  level: Level;
  xp: number;
  targetLang: Lang;
  streak: number;
}) {
  const lvl = computeLevelFromXp(xp).level;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-2xl font-black">
          <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-indigo-300 dark:to-fuchsia-300">
            SprachenlernApp
          </span>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Deutsch → <b className="text-slate-900 dark:text-slate-100">{targetLang}</b> · Level{" "}
          <b className="text-slate-900 dark:text-slate-100">{lvl}</b> · {level === "BEGINNER" ? "Beginner" : level === "INTERMEDIATE" ? "Intermediate" : "Advanced"} ·{" "}
          <b className="text-slate-900 dark:text-slate-100">{streak}</b>🔥
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <TopButton active={view === "today"} onClick={() => setView("today")} label="Heute" />
        <TopButton active={view === "practice"} onClick={() => setView("practice")} label="Übungen" />
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
      <div className="mx-auto grid max-w-5xl grid-cols-4 gap-1 p-2">
        <NavBtn active={view === "today"} onClick={() => setView("today")} label="Heute" />
        <NavBtn active={view === "practice"} onClick={() => setView("practice")} label="Übungen" />
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
function SmallToggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 ${
        active ? "border-indigo-200 bg-indigo-50 dark:bg-slate-900" : "border-slate-200 bg-white dark:bg-slate-950"
      }`}
    >
      {label}
    </button>
  );
}
