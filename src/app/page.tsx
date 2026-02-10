"use client";

import React, { useEffect, useMemo, useState } from "react";

/** -----------------------------
 * Types
 * ------------------------------ */
type CardKind = "vocab" | "sentence";

type Card = {
  id: string;
  kind: CardKind;
  deckId: string;

  // vocab: front=Wort, back=Übersetzung
  // sentence: front=Satz, back=Übersetzung
  front: string;
  back: string;

  // Optional enrichment
  example?: string; // bei Import als Attribution/Quelle nutzbar
  exampleTranslation?: string;
  audioUrl?: string;

  // SRS light
  due: number; // unix ms
  intervalDays: number;
  ease: number; // 1.3..2.8
  lapses: number;
  lastReviewed?: number;
};

type Deck = {
  id: string;
  name: string;
  fromLang: string;
  toLang: string;
};

type AppData = {
  decks: Deck[];
  cards: Card[];
  dailyStats: Record<string, { reviewed: number; correct: number; wrong: number }>;
};

type View = "learn" | "practice" | "decks" | "stats" | "settings";
type ThemeMode = "light" | "dark";

type AppTheme = "ocean" | "sunset" | "lime" | "grape";

/** -----------------------------
 * Storage keys
 * ------------------------------ */
const STORAGE_KEY = "lingua_mvp_v3";
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
 * Language map for Tatoeba
 * ------------------------------ */
const UI_TO_TATOEBA: Record<string, string> = {
  DE: "deu",
  EN: "eng",
  ES: "spa",
  FR: "fra",
  RU: "rus",
};

/** -----------------------------
 * Helpers
 * ------------------------------ */
function uid() {
  // prefer crypto.randomUUID when available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c: any = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
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

/** SRS light algorithm */
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

  // wrong => retry in ~6h
  const due = now + (correct ? intervalDays : 0.25) * 24 * 60 * 60 * 1000;
  return {
    ...card,
    ease,
    intervalDays,
    due,
    lapses: correct ? card.lapses : card.lapses + 1,
    lastReviewed: now,
  };
}

function makeCloze(sentence: string) {
  // Simple: hide a "good" word (>=4 chars). Falls back to last word.
  const cleanedWords = sentence
    .split(/\s+/)
    .map((w) => w.replace(/[.,!?;:()"„“”“'’]/g, ""))
    .filter(Boolean);

  const candidates = cleanedWords.filter((w) => w.length >= 4);
  const answer = candidates.length ? pickRandom(candidates) : cleanedWords[cleanedWords.length - 1] ?? "";

  // replace first exact word match
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
 * Data load/save
 * ------------------------------ */
function loadData(): AppData {
  const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  if (raw) return JSON.parse(raw) as AppData;

  const deckId = uid();
  const now = Date.now();

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
  };
}

function saveData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** -----------------------------
 * Main component
 * ------------------------------ */
export default function Page() {
  const [data, setData] = useState<AppData>(() => loadData());
  const [view, setView] = useState<View>("learn");
  const [activeDeckId, setActiveDeckId] = useState<string>(() => loadData().decks[0]?.id ?? "");
  const [showBack, setShowBack] = useState(false);
  const [importText, setImportText] = useState("");
  const [mode, setMode] = useState<ThemeMode>("light");
  const [palette, setPalette] = useState<AppTheme>("ocean");

  // Tatoeba import UI
  const [importing, setImporting] = useState(false);
  const [importFrom, setImportFrom] = useState("DE");
  const [importTo, setImportTo] = useState("EN");
  const [importCount, setImportCount] = useState(50);
  const [importStatus, setImportStatus] = useState<string>("");

  // init + apply mode (dark class)
  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as ThemeMode | null) ?? "light";
    setMode(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  // init + apply palette (theme-* classes)
  useEffect(() => {
    const saved = (localStorage.getItem(PALETTE_KEY) as AppTheme | null) ?? "ocean";
    setPalette(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(PALETTE_KEY, palette);
    // remove all theme classes first
    Object.values(THEME_CLASS).forEach((cls) => document.documentElement.classList.remove(cls));
    document.documentElement.classList.add(THEME_CLASS[palette]);
  }, [palette]);

  useEffect(() => saveData(data), [data]);

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
    return data.dailyStats[key] ?? { reviewed: 0, correct: 0, wrong: 0 };
  }, [data.dailyStats]);

  function bumpStats(correct: boolean) {
    const key = todayKey();
    setData((prev) => {
      const cur = prev.dailyStats[key] ?? { reviewed: 0, correct: 0, wrong: 0 };
      return {
        ...prev,
        dailyStats: {
          ...prev.dailyStats,
          [key]: {
            reviewed: cur.reviewed + 1,
            correct: cur.correct + (correct ? 1 : 0),
            wrong: cur.wrong + (correct ? 0 : 1),
          },
        },
      };
    });
  }

  function review(correct: boolean) {
    if (!nextCard) return;
    setShowBack(false);
    bumpStats(correct);
    setData((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => (c.id === nextCard.id ? schedule(c, correct) : c)),
    }));
  }

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

  function exportJSON() {
    const payload = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(payload).catch(() => {});
    alert("Export in die Zwischenablage kopiert (JSON).");
  }

  function importJSON() {
    try {
      const parsed = JSON.parse(importText);
      if (!parsed?.decks || !parsed?.cards) throw new Error("Ungültiges Format.");
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

      // expected: json.data[] from tatoeba unstable endpoint
      const items: any[] = json?.data ?? [];

      const now = Date.now();
      const newCards: Card[] = items
        .map((s) => {
          const srcText = s?.text;
          // translations can be nested; we try to pick matching lang
          const transArr = Array.isArray(s?.translations) ? s.translations : [];
          const trans =
            transArr.find((tr: any) => tr?.lang === to) ??
            transArr.find((tr: any) => tr?.text) ??
            null;

          const trgText = trans?.text;
          const author = s?.owner?.username || s?.owner || "unknown";
          const sid = s?.id;

          if (!srcText || !trgText) return null;

          const card: Card = {
            id: uid(),
            kind: "sentence",
            deckId: activeDeckId,
            front: String(srcText),
            back: String(trgText),
            due: now,
            intervalDays: 0,
            ease: 2.0,
            lapses: 0,
            // minimal attribution note (CC BY: author + source)
            example: `Quelle: Tatoeba · Autor: ${author} · ID: ${sid}`,
          };
          return card;
        })
        .filter(Boolean) as Card[];

      // dedupe by (deckId, kind, front, back)
      setData((prev) => {
        const existing = new Set(prev.cards.map((c) => `${c.deckId}::${c.kind}::${c.front}::${c.back}`));
        const filtered = newCards.filter((c) => !existing.has(`${c.deckId}::${c.kind}::${c.front}::${c.back}`));
        const added = filtered.length;

        setImportStatus(`✅ Importiert: ${added} (Duplikate ignoriert)`);
        return { ...prev, cards: [...filtered, ...prev.cards] };
      });
    } catch (e: any) {
      setImportStatus(`❌ ${e?.message ?? "Fehler"}`);
    } finally {
      setImporting(false);
    }
  }

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
        />

        {view === "learn" && (
          <div className="mt-6 grid gap-4">
            <CardShell>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Aktives Deck</div>
                  <div className="text-lg font-semibold">{activeDeck?.name ?? "—"}</div>
                </div>
                <Pill>{dueCards.length} fällig</Pill>
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
                    <button
                      className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90"
                      onClick={() => {
                        if (nextCard.audioUrl) new Audio(nextCard.audioUrl).play();
                        else alert("Kein Audio hinterlegt.");
                      }}
                    >
                      🔊 Audio
                    </button>
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
                    Intervall:{" "}
                    <b className="text-slate-900 dark:text-slate-100">{nextCard.intervalDays}d</b> · Ease:{" "}
                    <b className="text-slate-900 dark:text-slate-100">{nextCard.ease.toFixed(2)}</b> · Lapses:{" "}
                    <b className="text-slate-900 dark:text-slate-100">{nextCard.lapses}</b>
                  </div>
                </>
              )}
            </CardShell>

            <CardShell>
              <div className="text-sm text-slate-500 dark:text-slate-400">Heute</div>
              <div className="mt-2 grid grid-cols-3 gap-3">
                <Stat label="Gelernt" value={statsToday.reviewed} />
                <Stat label="Richtig" value={statsToday.correct} />
                <Stat label="Falsch" value={statsToday.wrong} />
              </div>
            </CardShell>
          </div>
        )}

        {view === "practice" && (
          <Practice
            cards={data.cards.filter((c) => c.deckId === activeDeckId)}
            onCorrect={() => bumpStats(true)}
            onWrong={() => bumpStats(false)}
          />
        )}

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
                      active
                        ? "border-indigo-200 bg-[var(--card)] dark:border-indigo-900"
                        : "border-slate-200 bg-[var(--card)] dark:border-slate-800"
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

                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Hinweis: Liste zeigt max. 60 Karten (MVP).
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "stats" && (
          <div className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">Statistik</h2>
            <CardShell>
              <div className="text-sm text-slate-500 dark:text-slate-400">Letzte Tage</div>
              <div className="mt-3 overflow-auto rounded-2xl border border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-950/60">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gradient-to-r from-sky-100 to-fuchsia-100 text-slate-700 dark:from-slate-900 dark:to-slate-900 dark:text-slate-200">
                    <tr>
                      <th className="p-3">Datum</th>
                      <th className="p-3">Gelernt</th>
                      <th className="p-3">Richtig</th>
                      <th className="p-3">Falsch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {Object.entries(data.dailyStats)
                      .sort(([a], [b]) => (a < b ? 1 : -1))
                      .slice(0, 14)
                      .map(([day, s]) => (
                        <tr key={day}>
                          <td className="p-3">{day}</td>
                          <td className="p-3">{s.reviewed}</td>
                          <td className="p-3">{s.correct}</td>
                          <td className="p-3">{s.wrong}</td>
                        </tr>
                      ))}
                    {Object.keys(data.dailyStats).length === 0 && (
                      <tr>
                        <td className="p-3 text-slate-500 dark:text-slate-400" colSpan={4}>
                          Noch keine Lern-Sessions.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardShell>
          </div>
        )}

        {view === "settings" && (
          <div className="mt-6 grid gap-4">
            <h2 className="text-xl font-semibold">Einstellungen</h2>

            <CardShell>
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm text-slate-600 dark:text-slate-400">Theme:</div>
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
                  Alles zurücksetzen
                </button>
              </div>

              <div className="mt-5">
                <div className="text-sm text-slate-500 dark:text-slate-400">Import (JSON)</div>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="mt-2 h-40 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  placeholder='{"decks":[...],"cards":[...],"dailyStats":{...}}'
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
                Importiert zufällige <b>Satzkarten</b> (Front=Quellsatz, Back=Übersetzung). Attribution wird als Hinweis gespeichert.
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

              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Hinweis: Damit das klappt, brauchst du die API Route <code className="px-1">src/app/api/tatoeba/route.ts</code> (wie oben gezeigt).
              </div>
            </CardShell>
          </div>
        )}
      </div>

      <BottomNav view={view} setView={setView} />
    </div>
  );
}

/** -----------------------------
 * Practice component
 * ------------------------------ */
function Practice({
  cards,
  onCorrect,
  onWrong,
}: {
  cards: Card[];
  onCorrect: () => void;
  onWrong: () => void;
}) {
  const vocab = cards.filter((c) => c.kind === "vocab");
  const sentences = cards.filter((c) => c.kind === "sentence");

  const [mode, setMode] = useState<"cloze" | "mc">("cloze");
  const [reveal, setReveal] = useState(false);
  const [currentId, setCurrentId] = useState<string>("");

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
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Erstelle zuerst Vokabel- oder Satzkarten im Tab “Decks”.
        </div>
      </div>
    );
  }

  if (mode === "cloze") {
    const { cloze, answer } = makeCloze(current.front);

    return (
      <div className="mt-6 grid gap-4">
        <div className="flex flex-wrap gap-2">
          <ModeBtn active={mode === "cloze"} onClick={() => setMode("cloze")} label="Lückentext" />
          <ModeBtn active={mode === "mc"} onClick={() => setMode("mc")} label="Multiple Choice" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[var(--card)] p-6 shadow-sm dark:border-slate-800">
          <div className="text-sm text-slate-600 dark:text-slate-400">Setze das fehlende Wort ein:</div>
          <div className="mt-3 text-2xl font-black">{cloze}</div>

          <button
            className="mt-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90"
            onClick={() => setReveal((r) => !r)}
          >
            {reveal ? "Antwort verstecken" : "Antwort zeigen"}
          </button>

          {reveal && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="font-semibold">Antwort: {answer}</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">Übersetzung: {current.back}</div>
              {current.example && (
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-300">{current.example}</div>
              )}
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              className="rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-3 font-semibold text-white shadow hover:opacity-90"
              onClick={() => {
                onWrong();
                if (sentences.length > 1) setCurrentId(pickRandom(sentences).id);
                setReveal(false);
              }}
            >
              Nicht geschafft
            </button>
            <button
              className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 font-semibold text-white shadow hover:opacity-90"
              onClick={() => {
                onCorrect();
                if (sentences.length > 1) setCurrentId(pickRandom(sentences).id);
                setReveal(false);
              }}
            >
              Geschafft
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MC vocab
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
        <div className="text-sm text-slate-600 dark:text-slate-400">Wähle die richtige Übersetzung:</div>
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
            {current.exampleTranslation && (
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{current.exampleTranslation}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** -----------------------------
 * UI Components
 * ------------------------------ */
function Header({
  view,
  setView,
  activeDeck,
  dueCount,
  mode,
  toggleMode,
}: {
  view: View;
  setView: (v: View) => void;
  activeDeck?: Deck;
  dueCount: number;
  mode: ThemeMode;
  toggleMode: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="text-2xl font-black">
          <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-indigo-300 dark:to-fuchsia-300">
            Lingua
          </span>{" "}
          <span className="text-slate-900 dark:text-slate-50">MVP</span>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {activeDeck ? (
            <>
              {activeDeck.name} · <b className="text-slate-900 dark:text-slate-100">{dueCount}</b> fällig
            </>
          ) : (
            "Kein Deck"
          )}
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <TopButton active={view === "learn"} onClick={() => setView("learn")} label="Lernen" />
        <TopButton active={view === "practice"} onClick={() => setView("practice")} label="Übungen" />
        <TopButton active={view === "decks"} onClick={() => setView("decks")} label="Decks" />
        <TopButton active={view === "stats"} onClick={() => setView("stats")} label="Stats" />
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
        active
          ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
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
        <NavBtn active={view === "stats"} onClick={() => setView("stats")} label="Stats" />
        <NavBtn active={view === "settings"} onClick={() => setView("settings")} label="Settings" />
      </div>
    </div>
  );
}

function NavBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-3 py-2 text-sm font-semibold shadow-sm ${
        active
          ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
      }`}
    >
      {label}
    </button>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[var(--card)] p-5 shadow-sm dark:border-slate-800">
      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-sm font-semibold text-white shadow">
      {children}
    </div>
  );
}

function FancyBtn({ variant, onClick, label }: { variant: "good" | "bad"; onClick: () => void; label: string }) {
  const cls = variant === "good" ? "from-emerald-500 to-teal-500" : "from-rose-500 to-orange-500";
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl bg-gradient-to-r ${cls} px-4 py-3 font-semibold text-white shadow hover:opacity-90`}
    >
      {label}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
      <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-black bg-gradient-to-r from-sky-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-sky-300 dark:to-fuchsia-300">
        {value}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
      <div className="text-xl font-semibold">Keine fälligen Karten 🎉</div>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Geh zu “Decks” und füge neue Karten hinzu, oder übe im Tab “Übungen”.
      </div>
    </div>
  );
}

function ModeBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-4 py-2 font-semibold ${
        active ? "bg-indigo-50 dark:bg-slate-900" : "bg-white dark:bg-slate-950"
      } border-slate-200 shadow-sm hover:shadow dark:border-slate-800`}
    >
      {label}
    </button>
  );
}
