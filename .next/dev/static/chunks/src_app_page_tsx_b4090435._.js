(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const STORAGE_KEY = "sprachapp_auto_v1";
const THEME_KEY = "sprachapp_theme_mode_v1";
const PALETTE_KEY = "sprachapp_palette_v1";
const THEME_CLASS = {
    ocean: "theme-ocean",
    sunset: "theme-sunset",
    lime: "theme-lime",
    grape: "theme-grape"
};
const TTS_LANG = {
    DE: "de-DE",
    EN: "en-US",
    ES: "es-ES",
    FR: "fr-FR",
    RU: "ru-RU"
};
/** ---------- Starter Packs (offline) ----------
 *  Kleines Starter-Pack – wir können später massiv erweitern / Download-Packs bauen.
 */ const PACKS = {
    EN: {
        vocab: [
            {
                de: "laufen",
                x: "to run",
                ex: "Ich laufe jeden Morgen.",
                exTr: "I run every morning."
            },
            {
                de: "essen",
                x: "to eat",
                ex: "Ich esse gern Pasta.",
                exTr: "I like eating pasta."
            },
            {
                de: "trinken",
                x: "to drink",
                ex: "Trinkst du Wasser?",
                exTr: "Are you drinking water?"
            },
            {
                de: "Zeit",
                x: "time",
                ex: "Ich habe keine Zeit.",
                exTr: "I have no time."
            },
            {
                de: "Freund",
                x: "friend",
                ex: "Er ist mein Freund.",
                exTr: "He is my friend."
            },
            {
                de: "lernen",
                x: "to learn",
                ex: "Ich lerne Englisch.",
                exTr: "I am learning English."
            },
            {
                de: "Arbeit",
                x: "work",
                ex: "Ich gehe zur Arbeit.",
                exTr: "I go to work."
            },
            {
                de: "Haus",
                x: "house",
                ex: "Das Haus ist groß.",
                exTr: "The house is big."
            },
            {
                de: "Buch",
                x: "book",
                ex: "Das Buch ist interessant.",
                exTr: "The book is interesting."
            },
            {
                de: "heute",
                x: "today",
                ex: "Heute ist Montag.",
                exTr: "Today is Monday."
            }
        ],
        sentences: [
            {
                de: "Ich gehe heute nicht zur Arbeit.",
                x: "I am not going to work today."
            },
            {
                de: "Kannst du mir bitte helfen?",
                x: "Can you please help me?"
            },
            {
                de: "Wie spät ist es?",
                x: "What time is it?"
            },
            {
                de: "Ich verstehe das nicht.",
                x: "I don't understand that."
            },
            {
                de: "Ich möchte einen Kaffee.",
                x: "I would like a coffee."
            }
        ]
    },
    ES: {
        vocab: [
            {
                de: "Hallo",
                x: "hola"
            },
            {
                de: "bitte",
                x: "por favor"
            },
            {
                de: "danke",
                x: "gracias"
            },
            {
                de: "Wasser",
                x: "agua"
            },
            {
                de: "essen",
                x: "comer"
            },
            {
                de: "trinken",
                x: "beber"
            },
            {
                de: "Haus",
                x: "casa"
            },
            {
                de: "Freund",
                x: "amigo"
            },
            {
                de: "Zeit",
                x: "tiempo"
            },
            {
                de: "heute",
                x: "hoy"
            }
        ],
        sentences: [
            {
                de: "Ich möchte einen Kaffee, bitte.",
                x: "Quisiera un café, por favor."
            },
            {
                de: "Ich verstehe das nicht.",
                x: "No entiendo eso."
            },
            {
                de: "Wo ist die Toilette?",
                x: "¿Dónde está el baño?"
            },
            {
                de: "Kannst du mir helfen?",
                x: "¿Puedes ayudarme?"
            },
            {
                de: "Wie spät ist es?",
                x: "¿Qué hora es?"
            }
        ]
    },
    FR: {
        vocab: [
            {
                de: "Hallo",
                x: "bonjour"
            },
            {
                de: "bitte",
                x: "s'il vous plaît"
            },
            {
                de: "danke",
                x: "merci"
            },
            {
                de: "Wasser",
                x: "eau"
            },
            {
                de: "essen",
                x: "manger"
            },
            {
                de: "trinken",
                x: "boire"
            },
            {
                de: "Haus",
                x: "maison"
            },
            {
                de: "Freund",
                x: "ami"
            },
            {
                de: "Zeit",
                x: "temps"
            },
            {
                de: "heute",
                x: "aujourd'hui"
            }
        ],
        sentences: [
            {
                de: "Ich möchte einen Kaffee, bitte.",
                x: "Je voudrais un café, s'il vous plaît."
            },
            {
                de: "Ich verstehe das nicht.",
                x: "Je ne comprends pas."
            },
            {
                de: "Wo ist die Toilette?",
                x: "Où sont les toilettes ?"
            },
            {
                de: "Kannst du mir helfen?",
                x: "Peux-tu m'aider ?"
            },
            {
                de: "Wie spät ist es?",
                x: "Quelle heure est-il ?"
            }
        ]
    },
    RU: {
        vocab: [
            {
                de: "Hallo",
                x: "привет"
            },
            {
                de: "bitte",
                x: "пожалуйста"
            },
            {
                de: "danke",
                x: "спасибо"
            },
            {
                de: "Wasser",
                x: "вода"
            },
            {
                de: "essen",
                x: "есть"
            },
            {
                de: "trinken",
                x: "пить"
            },
            {
                de: "Haus",
                x: "дом"
            },
            {
                de: "Freund",
                x: "друг"
            },
            {
                de: "Zeit",
                x: "время"
            },
            {
                de: "heute",
                x: "сегодня"
            }
        ],
        sentences: [
            {
                de: "Ich verstehe das nicht.",
                x: "Я не понимаю."
            },
            {
                de: "Kannst du mir helfen?",
                x: "Ты можешь мне помочь?"
            },
            {
                de: "Wie spät ist es?",
                x: "Который час?"
            },
            {
                de: "Ich möchte einen Kaffee, bitte.",
                x: "Я хотел(а) бы кофе, пожалуйста."
            },
            {
                de: "Wo ist die Toilette?",
                x: "Где туалет?"
            }
        ]
    }
};
/** ---------- Helpers ---------- */ function uid() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = globalThis.crypto;
    if (c?.randomUUID) return c.randomUUID();
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function pad2(n) {
    return String(n).padStart(2, "0");
}
function todayKey(d = new Date()) {
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
}
function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function diffDays(a, b) {
    const [ay, am, ad] = a.split("-").map(Number);
    const [by, bm, bd] = b.split("-").map(Number);
    const da = new Date(ay, am - 1, ad).getTime();
    const db = new Date(by, bm - 1, bd).getTime();
    return Math.round((db - da) / (24 * 60 * 60 * 1000));
}
/** ---------- SRS (light) ---------- */ function schedule(card, correct) {
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
        lastReviewed: now
    };
}
/** ---------- Practice helpers (word-choice cloze) ---------- */ function makeCloze(sentence) {
    const cleanedWords = sentence.split(/\s+/).map((w)=>w.replace(/[.,!?;:()"„“”“'’]/g, "")).filter(Boolean);
    const candidates = cleanedWords.filter((w)=>w.length >= 4);
    const answer = candidates.length ? pickRandom(candidates) : cleanedWords[cleanedWords.length - 1] ?? "";
    const re = new RegExp(`\\b${escapeRegExp(answer)}\\b`);
    const cloze = sentence.replace(re, "____");
    return {
        cloze,
        answer
    };
}
function makeChoices(correct, pool, n = 4) {
    const wrongs = pool.filter((x)=>x !== correct);
    const picks = new Set([
        correct
    ]);
    while(picks.size < n && wrongs.length)picks.add(pickRandom(wrongs));
    return Array.from(picks).sort(()=>Math.random() - 0.5);
}
/** ---------- Audio feedback ---------- */ function playTone(type) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
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
    setTimeout(()=>ctx.close().catch(()=>{}), 400);
}
function vibrate(ms) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    navigator.vibrate?.(ms);
}
/** ---------- Robust TTS voice picking ---------- */ function speak(text, lang) {
    if (("TURBOPACK compile-time value", "object") === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    const targetLang = lang || "en-US";
    function pickVoiceAndSpeak() {
        const voices = synth.getVoices();
        if (!voices.length) return;
        const primary = targetLang.split("-")[0].toLowerCase();
        const voice = voices.find((v)=>v.lang?.toLowerCase() === targetLang.toLowerCase()) || voices.find((v)=>v.lang?.toLowerCase().startsWith(primary)) || voices[0];
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.speechSynthesis?.cancel();
}
/** ---------- Gamification ---------- */ function xpForLevel(level) {
    return Math.round(100 * Math.pow(level, 1.2));
}
function computeLevelFromXp(totalXp) {
    let lvl = 1;
    let xp = totalXp;
    while(xp >= xpForLevel(lvl) && lvl < 200){
        xp -= xpForLevel(lvl);
        lvl += 1;
    }
    const need = xpForLevel(lvl);
    const progress = need === 0 ? 0 : clamp(xp / need, 0, 1);
    return {
        level: lvl,
        xpIntoLevel: xp,
        xpNeed: need,
        progress
    };
}
function addXp(profile, amount) {
    const newXp = Math.max(0, profile.xp + amount);
    const { level } = computeLevelFromXp(newXp);
    return {
        ...profile,
        xp: newXp,
        /* derived */ lastActiveDay: profile.lastActiveDay,
        streak: profile.streak,
        bestStreak: profile.bestStreak,
        level
    };
}
function defaultAchievements() {
    return [
        {
            id: "first10",
            title: "Erste Schritte",
            desc: "Lerne 10 Karten",
            icon: "✨"
        },
        {
            id: "streak3",
            title: "Konsequent",
            desc: "3 Tage Streak",
            icon: "🔥"
        },
        {
            id: "streak7",
            title: "Eine Woche",
            desc: "7 Tage Streak",
            icon: "🏅"
        },
        {
            id: "review100",
            title: "Hundert",
            desc: "Lerne 100 Karten",
            icon: "💯"
        },
        {
            id: "perfect20day",
            title: "Sauber!",
            desc: "20 richtige an einem Tag",
            icon: "🎯"
        },
        {
            id: "nightowl",
            title: "Night Owl",
            desc: "Lerne nach 23:00",
            icon: "🌙"
        }
    ];
}
/** ---------- Data load/save ---------- */ function loadData() {
    const raw = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem(STORAGE_KEY) : "TURBOPACK unreachable";
    if (raw) return JSON.parse(raw);
    const now = Date.now();
    const prof = {
        username: "Learner",
        nativeLang: "DE",
        targetLang: "EN",
        level: "BEGINNER",
        dailyGoal: 20,
        xp: 0,
        streak: 0,
        bestStreak: 0,
        lastActiveDay: todayKey(),
        createdAt: now
    };
    const seed = seedCardsFromPack("EN", "BEGINNER", 30);
    return {
        cards: seed,
        profile: prof,
        achievements: defaultAchievements(),
        dailyStatsByLang: {
            EN: {},
            ES: {},
            FR: {},
            RU: {}
        }
    };
}
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
/** ---------- Seeding logic (auto content) ---------- */ function seedCardsFromPack(targetLang, level, maxCards) {
    const pack = PACKS[targetLang];
    const now = Date.now();
    // simple level scaling: beginner uses more vocab than sentences; advanced more sentences
    const vocabRatio = level === "BEGINNER" ? 0.7 : level === "INTERMEDIATE" ? 0.55 : 0.45;
    const vocabCount = Math.max(5, Math.round(maxCards * vocabRatio));
    const sentCount = Math.max(3, maxCards - vocabCount);
    const vocabs = pack.vocab.slice(0, vocabCount).map((v)=>({
            id: uid(),
            targetLang,
            kind: "vocab",
            front: v.de,
            back: v.x,
            example: v.ex,
            exampleTranslation: v.exTr,
            due: now,
            intervalDays: 0,
            ease: 2.0,
            lapses: 0
        }));
    const sents = pack.sentences.slice(0, sentCount).map((s)=>({
            id: uid(),
            targetLang,
            kind: "sentence",
            front: s.de,
            back: s.x,
            due: now,
            intervalDays: 0,
            ease: 2.0,
            lapses: 0
        }));
    return [
        ...vocabs,
        ...sents
    ].slice(0, maxCards);
}
function Page() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Page.useState": ()=>loadData()
    }["Page.useState"]);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("today");
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    const [palette, setPalette] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ocean");
    const sessionStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Date.now());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>saveData(data)
    }["Page.useEffect"], [
        data
    ]);
    /** theme init */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            const saved = localStorage.getItem(THEME_KEY) ?? "light";
            setMode(saved);
            document.documentElement.classList.toggle("dark", saved === "dark");
        }
    }["Page.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            localStorage.setItem(THEME_KEY, mode);
            document.documentElement.classList.toggle("dark", mode === "dark");
        }
    }["Page.useEffect"], [
        mode
    ]);
    /** palette init */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            const saved = localStorage.getItem(PALETTE_KEY) ?? "ocean";
            setPalette(saved);
        }
    }["Page.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            localStorage.setItem(PALETTE_KEY, palette);
            Object.values(THEME_CLASS).forEach({
                "Page.useEffect": (cls)=>document.documentElement.classList.remove(cls)
            }["Page.useEffect"]);
            document.documentElement.classList.add(THEME_CLASS[palette]);
        }
    }["Page.useEffect"], [
        palette
    ]);
    /** streak day rollover */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            const today = todayKey();
            setData({
                "Page.useEffect": (prev)=>{
                    const p = prev.profile;
                    const delta = diffDays(p.lastActiveDay, today);
                    if (delta <= 0) return prev;
                    // if missed days => reset streak (we keep it simple)
                    if (delta >= 2) return {
                        ...prev,
                        profile: {
                            ...p,
                            streak: 0,
                            lastActiveDay: today
                        }
                    };
                    return {
                        ...prev,
                        profile: {
                            ...p,
                            lastActiveDay: today
                        }
                    };
                }
            }["Page.useEffect"]);
        }
    }["Page.useEffect"], []);
    const target = data.profile.targetLang;
    /** ensure we always have some cards for selected language */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            const has = data.cards.some({
                "Page.useEffect.has": (c)=>c.targetLang === target
            }["Page.useEffect.has"]);
            if (has) return;
            setData({
                "Page.useEffect": (prev)=>({
                        ...prev,
                        cards: [
                            ...seedCardsFromPack(prev.profile.targetLang, prev.profile.level, 30),
                            ...prev.cards
                        ]
                    })
            }["Page.useEffect"]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Page.useEffect"], [
        target
    ]);
    const allCardsForLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[allCardsForLang]": ()=>data.cards.filter({
                "Page.useMemo[allCardsForLang]": (c)=>c.targetLang === target
            }["Page.useMemo[allCardsForLang]"])
    }["Page.useMemo[allCardsForLang]"], [
        data.cards,
        target
    ]);
    const dueCards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[dueCards]": ()=>{
            const now = Date.now();
            return allCardsForLang.filter({
                "Page.useMemo[dueCards]": (c)=>c.due <= now
            }["Page.useMemo[dueCards]"]).sort({
                "Page.useMemo[dueCards]": (a, b)=>a.due - b.due
            }["Page.useMemo[dueCards]"]);
        }
    }["Page.useMemo[dueCards]"], [
        allCardsForLang
    ]);
    const nextCard = dueCards[0];
    const todayStat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[todayStat]": ()=>{
            const k = todayKey();
            return data.dailyStatsByLang[target]?.[k] ?? {
                reviewed: 0,
                correct: 0,
                wrong: 0,
                minutes: 0
            };
        }
    }["Page.useMemo[todayStat]"], [
        data.dailyStatsByLang,
        target
    ]);
    function addMinutesSinceLastTick() {
        const now = Date.now();
        const elapsed = now - sessionStartRef.current;
        if (elapsed < 30_000) return 0;
        const minutes = Math.floor(elapsed / 60_000);
        if (minutes <= 0) return 0;
        sessionStartRef.current = now;
        return minutes;
    }
    function bumpStats(correct) {
        const k = todayKey();
        const addMin = addMinutesSinceLastTick();
        setData((prev)=>{
            const byLang = {
                ...prev.dailyStatsByLang
            };
            const langMap = {
                ...byLang[target] ?? {}
            };
            const cur = langMap[k] ?? {
                reviewed: 0,
                correct: 0,
                wrong: 0,
                minutes: 0
            };
            langMap[k] = {
                reviewed: cur.reviewed + 1,
                correct: cur.correct + (correct ? 1 : 0),
                wrong: cur.wrong + (correct ? 0 : 1),
                minutes: cur.minutes + addMin
            };
            byLang[target] = langMap;
            return {
                ...prev,
                dailyStatsByLang: byLang
            };
        });
    }
    function updateStreakIfGoalMet(nextReviewed) {
        const today = todayKey();
        setData((prev)=>{
            const p = prev.profile;
            if (nextReviewed < p.dailyGoal) return prev;
            // if already "counted today", no extra action
            if (p.lastActiveDay === today && p.streak > 0) {
                return {
                    ...prev,
                    profile: {
                        ...p,
                        bestStreak: Math.max(p.bestStreak, p.streak),
                        lastActiveDay: today
                    }
                };
            }
            const delta = diffDays(p.lastActiveDay, today);
            let streak = p.streak;
            if (delta === 0) streak = p.streak;
            else if (delta === 1) streak = p.streak + 1;
            else streak = 1;
            return {
                ...prev,
                profile: {
                    ...p,
                    streak,
                    bestStreak: Math.max(p.bestStreak, streak),
                    lastActiveDay: today
                }
            };
        });
    }
    function unlockAchievement(id) {
        setData((prev)=>{
            const idx = prev.achievements.findIndex((a)=>a.id === id);
            if (idx < 0) return prev;
            if (prev.achievements[idx].unlockedAt) return prev;
            const updated = [
                ...prev.achievements
            ];
            updated[idx] = {
                ...updated[idx],
                unlockedAt: Date.now()
            };
            return {
                ...prev,
                achievements: updated
            };
        });
    }
    function evaluateAchievements() {
        const k = todayKey();
        const t = data.dailyStatsByLang[target]?.[k] ?? {
            reviewed: 0,
            correct: 0,
            wrong: 0,
            minutes: 0
        };
        const totalReviewedAllLang = Object.values(data.dailyStatsByLang).flatMap((m)=>Object.values(m)).reduce((s, d)=>s + (d.reviewed || 0), 0);
        if (totalReviewedAllLang >= 10) unlockAchievement("first10");
        if (totalReviewedAllLang >= 100) unlockAchievement("review100");
        if (data.profile.streak >= 3) unlockAchievement("streak3");
        if (data.profile.streak >= 7) unlockAchievement("streak7");
        if (t.correct >= 20) unlockAchievement("perfect20day");
        if (new Date().getHours() >= 23) unlockAchievement("nightowl");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            evaluateAchievements();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Page.useEffect"], [
        data.dailyStatsByLang,
        data.profile.streak,
        data.profile.targetLang
    ]);
    /** learned definitions */ const learnedThreshold = 3; // days
    const masteredThreshold = 7;
    const learned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[learned]": ()=>{
            const vocabLearned = allCardsForLang.filter({
                "Page.useMemo[learned]": (c)=>c.kind === "vocab" && c.intervalDays >= learnedThreshold
            }["Page.useMemo[learned]"]).length;
            const vocabMastered = allCardsForLang.filter({
                "Page.useMemo[learned]": (c)=>c.kind === "vocab" && c.intervalDays >= masteredThreshold
            }["Page.useMemo[learned]"]).length;
            const sentLearned = allCardsForLang.filter({
                "Page.useMemo[learned]": (c)=>c.kind === "sentence" && c.intervalDays >= learnedThreshold
            }["Page.useMemo[learned]"]).length;
            const total = allCardsForLang.length || 1;
            const learnedTotal = vocabLearned + sentLearned;
            return {
                vocabLearned,
                vocabMastered,
                sentLearned,
                learnedTotal,
                total,
                progress: clamp(learnedTotal / total, 0, 1)
            };
        }
    }["Page.useMemo[learned]"], [
        allCardsForLang
    ]);
    const goalProgress = clamp(todayStat.reviewed / Math.max(1, data.profile.dailyGoal), 0, 1);
    const goalMet = todayStat.reviewed >= data.profile.dailyGoal;
    const levelInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[levelInfo]": ()=>computeLevelFromXp(data.profile.xp)
    }["Page.useMemo[levelInfo]"], [
        data.profile.xp
    ]);
    const last14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[last14]": ()=>{
            const days = [];
            const base = new Date();
            for(let i = 13; i >= 0; i--){
                const d = new Date(base);
                d.setDate(d.getDate() - i);
                const key = todayKey(d);
                const s = data.dailyStatsByLang[target]?.[key] ?? {
                    reviewed: 0,
                    correct: 0,
                    wrong: 0,
                    minutes: 0
                };
                days.push({
                    day: key,
                    s
                });
            }
            return days;
        }
    }["Page.useMemo[last14]"], [
        data.dailyStatsByLang,
        target
    ]);
    const totalsLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Page.useMemo[totalsLang]": ()=>{
            const all = Object.values(data.dailyStatsByLang[target] ?? {});
            const reviewed = all.reduce({
                "Page.useMemo[totalsLang].reviewed": (a, x)=>a + (x.reviewed || 0)
            }["Page.useMemo[totalsLang].reviewed"], 0);
            const correct = all.reduce({
                "Page.useMemo[totalsLang].correct": (a, x)=>a + (x.correct || 0)
            }["Page.useMemo[totalsLang].correct"], 0);
            const wrong = all.reduce({
                "Page.useMemo[totalsLang].wrong": (a, x)=>a + (x.wrong || 0)
            }["Page.useMemo[totalsLang].wrong"], 0);
            const minutes = all.reduce({
                "Page.useMemo[totalsLang].minutes": (a, x)=>a + (x.minutes || 0)
            }["Page.useMemo[totalsLang].minutes"], 0);
            const acc = reviewed ? Math.round(correct / reviewed * 100) : 0;
            return {
                reviewed,
                correct,
                wrong,
                minutes,
                acc
            };
        }
    }["Page.useMemo[totalsLang]"], [
        data.dailyStatsByLang,
        target
    ]);
    /** main review */ function review(correct) {
        if (!nextCard) return;
        playTone(correct ? "good" : "bad");
        vibrate(correct ? 20 : 60);
        bumpStats(correct);
        setData((prev)=>({
                ...prev,
                profile: addXp(prev.profile, correct ? 10 : 3)
            }));
        setData((prev)=>({
                ...prev,
                cards: prev.cards.map((c)=>c.id === nextCard.id ? schedule(c, correct) : c)
            }));
        const nextReviewed = todayStat.reviewed + 1;
        updateStreakIfGoalMet(nextReviewed);
        // small session bonus
        if (nextReviewed > 0 && nextReviewed % 20 === 0) {
            setData((prev)=>({
                    ...prev,
                    profile: addXp(prev.profile, 20)
                }));
        }
    }
    function addMoreStarterCards(n) {
        setData((prev)=>{
            const existingKeys = new Set(prev.cards.filter((c)=>c.targetLang === prev.profile.targetLang).map((c)=>`${c.kind}::${c.front}::${c.back}`));
            const fresh = seedCardsFromPack(prev.profile.targetLang, prev.profile.level, n * 2).filter((c)=>!existingKeys.has(`${c.kind}::${c.front}::${c.back}`));
            return {
                ...prev,
                cards: [
                    ...fresh.slice(0, n),
                    ...prev.cards
                ]
            };
        });
    }
    /** UI */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-[var(--bg1)] via-[var(--bg2)] to-[var(--bg3)] text-slate-900 dark:text-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-5xl px-4 pb-24 pt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Header, {
                        view: view,
                        setView: setView,
                        mode: mode,
                        toggleMode: ()=>setMode((t)=>t === "dark" ? "light" : "dark"),
                        level: data.profile.level,
                        xp: data.profile.xp,
                        targetLang: target,
                        streak: data.profile.streak
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 882,
                        columnNumber: 9
                    }, this),
                    view === "today" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 grid gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-slate-500 dark:text-slate-400",
                                                        children: "Lernsprache"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 888,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-semibold",
                                                        children: [
                                                            "Deutsch → ",
                                                            target
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 889,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 text-sm text-slate-600 dark:text-slate-400",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                className: "text-slate-900 dark:text-slate-100",
                                                                children: dueCards.length
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 891,
                                                                columnNumber: 21
                                                            }, this),
                                                            " fällig ·",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                className: "text-slate-900 dark:text-slate-100",
                                                                children: todayStat.reviewed
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 892,
                                                                columnNumber: 21
                                                            }, this),
                                                            " heute ·",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                className: "text-slate-900 dark:text-slate-100",
                                                                children: data.profile.streak
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 893,
                                                                columnNumber: 21
                                                            }, this),
                                                            "🔥 Streak"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 890,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 887,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                children: goalMet ? "✅ Ziel" : `${data.profile.dailyGoal} / Tag`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 896,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 886,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-xs text-slate-600 dark:text-slate-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Tagesziel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 901,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            todayStat.reviewed,
                                                            "/",
                                                            data.profile.dailyGoal
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 902,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 900,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500",
                                                    style: {
                                                        width: `${Math.round(goalProgress * 100)}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 907,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 906,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between text-xs text-slate-600 dark:text-slate-400",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Sprach-Fortschritt (gelernt)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 914,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    learned.learnedTotal,
                                                                    "/",
                                                                    learned.total
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 915,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 913,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500",
                                                            style: {
                                                                width: `${Math.round(learned.progress * 100)}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 920,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 919,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 text-sm text-slate-700 dark:text-slate-200",
                                                        children: [
                                                            "Gelernte Wörter: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: learned.vocabLearned
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 925,
                                                                columnNumber: 38
                                                            }, this),
                                                            " (Mastered: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: learned.vocabMastered
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 925,
                                                                columnNumber: 79
                                                            }, this),
                                                            ") · Gelernte Sätze: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: learned.sentLearned
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 925,
                                                                columnNumber: 129
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 924,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 912,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 899,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 885,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                                children: !nextCard ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border border-slate-200 bg-white/70 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950/60",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xl font-semibold",
                                            children: "Keine fälligen Karten 🎉"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 933,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 text-sm text-slate-600 dark:text-slate-400",
                                            children: "Du kannst neue Karten nachlegen (offline Starter-Pack)."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 934,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>addMoreStarterCards(15),
                                                    className: "rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90",
                                                    children: "＋ 15 Karten hinzufügen"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 936,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setView("practice"),
                                                    className: "rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950",
                                                    children: "Übungen →"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 939,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 935,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 932,
                                    columnNumber: 28
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-slate-500 dark:text-slate-400",
                                                    children: [
                                                        "Karte · ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            className: "text-slate-900 dark:text-slate-100",
                                                            children: nextCard.kind === "vocab" ? "Vokabel" : "Satz"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 946,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 945,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90",
                                                            onClick: ()=>speak(nextCard.front, TTS_LANG.DE),
                                                            title: "DE vorlesen",
                                                            children: "🔊 DE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 950,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90",
                                                            onClick: ()=>speak(nextCard.back, TTS_LANG[target]),
                                                            title: `${target} vorlesen`,
                                                            children: [
                                                                "🔊 ",
                                                                target
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 953,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950",
                                                            onClick: stopSpeak,
                                                            title: "Stop",
                                                            children: "⏹"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 956,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 949,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 944,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 grid gap-3 md:grid-cols-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl border border-slate-200 bg-[var(--cardSolid)] p-5 shadow-sm dark:border-slate-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-semibold text-slate-500 dark:text-slate-400",
                                                            children: "Deutsch"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 964,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 text-2xl font-black",
                                                            children: nextCard.front
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 965,
                                                            columnNumber: 23
                                                        }, this),
                                                        nextCard.example && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-3 rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm dark:border-slate-800 dark:bg-slate-950/60",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-semibold",
                                                                    children: nextCard.example
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 967,
                                                                    columnNumber: 27
                                                                }, this),
                                                                nextCard.exampleTranslation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-slate-600 dark:text-slate-300",
                                                                    children: nextCard.exampleTranslation
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 968,
                                                                    columnNumber: 59
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 966,
                                                            columnNumber: 44
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 963,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl border border-slate-200 bg-[var(--cardSolid)] p-5 shadow-sm dark:border-slate-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-semibold text-slate-500 dark:text-slate-400",
                                                            children: target
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 973,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 text-2xl font-black bg-gradient-to-r from-sky-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-sky-300 dark:to-fuchsia-300",
                                                            children: nextCard.back
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 974,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-3 text-sm text-slate-600 dark:text-slate-400",
                                                            children: [
                                                                "Intervall: ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                    className: "text-slate-900 dark:text-slate-100",
                                                                    children: [
                                                                        nextCard.intervalDays,
                                                                        "d"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 978,
                                                                    columnNumber: 36
                                                                }, this),
                                                                " · Ease:",
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                    className: "text-slate-900 dark:text-slate-100",
                                                                    children: nextCard.ease.toFixed(2)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 979,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 977,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 972,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 962,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 grid grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FancyBtn, {
                                                    variant: "bad",
                                                    onClick: ()=>review(false),
                                                    label: "✖ Nicht gewusst"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 985,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FancyBtn, {
                                                    variant: "good",
                                                    onClick: ()=>review(true),
                                                    label: "✔ Gewusst"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 986,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 984,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 931,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-slate-500 dark:text-slate-400",
                                                        children: [
                                                            "Heute (",
                                                            target,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 994,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 text-sm text-slate-600 dark:text-slate-400",
                                                        children: [
                                                            "Accuracy: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                className: "text-slate-900 dark:text-slate-100",
                                                                children: [
                                                                    todayStat.reviewed ? Math.round(todayStat.correct / todayStat.reviewed * 100) : 0,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 996,
                                                                columnNumber: 31
                                                            }, this),
                                                            " · Minuten:",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                className: "text-slate-900 dark:text-slate-100",
                                                                children: todayStat.minutes
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 997,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 995,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 993,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl border border-slate-200 bg-white/60 px-4 py-2 text-sm font-semibold dark:border-slate-800 dark:bg-slate-950/60",
                                                children: [
                                                    "Level ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-black",
                                                        children: computeLevelFromXp(data.profile.xp).level
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1001,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1000,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 992,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-xs text-slate-600 dark:text-slate-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "XP"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1007,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            levelInfo.xpIntoLevel,
                                                            "/",
                                                            levelInfo.xpNeed
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1008,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1006,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500",
                                                    style: {
                                                        width: `${Math.round(levelInfo.progress * 100)}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1013,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1012,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1005,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 991,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 884,
                        columnNumber: 30
                    }, this),
                    view === "practice" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Practice, {
                        targetLang: target,
                        nativeLang: "DE",
                        cards: allCardsForLang,
                        onCorrect: ()=>{
                            playTone("good");
                            vibrate(20);
                            bumpStats(true);
                            setData((prev)=>({
                                    ...prev,
                                    profile: addXp(prev.profile, 6)
                                }));
                            updateStreakIfGoalMet(todayStat.reviewed + 1);
                        },
                        onWrong: ()=>{
                            playTone("bad");
                            vibrate(60);
                            bumpStats(false);
                            setData((prev)=>({
                                    ...prev,
                                    profile: addXp(prev.profile, 2)
                                }));
                            updateStreakIfGoalMet(todayStat.reviewed + 1);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1021,
                        columnNumber: 33
                    }, this),
                    view === "profile" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 grid gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: [
                                    "Profil & Fortschritt (",
                                    target,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1042,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 font-black text-white shadow",
                                                        children: data.profile.username.slice(0, 1).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1047,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-lg font-semibold",
                                                                children: data.profile.username
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 1051,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-slate-600 dark:text-slate-400",
                                                                children: [
                                                                    "Deutsch → ",
                                                                    target,
                                                                    " · Level ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                        className: "text-slate-900 dark:text-slate-100",
                                                                        children: computeLevelFromXp(data.profile.xp).level
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 1053,
                                                                        columnNumber: 50
                                                                    }, this),
                                                                    " ·",
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                        className: "text-slate-900 dark:text-slate-100",
                                                                        children: data.profile.xp
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 1054,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    " XP"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 1052,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1050,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1046,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950",
                                                onClick: ()=>{
                                                    const name = prompt("Username ändern:", data.profile.username);
                                                    if (!name) return;
                                                    setData((prev)=>({
                                                            ...prev,
                                                            profile: {
                                                                ...prev.profile,
                                                                username: name
                                                            }
                                                        }));
                                                },
                                                children: "✏️ Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1059,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1045,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 grid grid-cols-2 gap-3 md:grid-cols-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                                                label: "Streak",
                                                value: data.profile.streak,
                                                suffix: "🔥"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1075,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                                                label: "Best",
                                                value: data.profile.bestStreak,
                                                suffix: "🏆"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1076,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                                                label: "Acc",
                                                value: totalsLang.acc,
                                                suffix: "%"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1077,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                                                label: "Minuten",
                                                value: totalsLang.minutes
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1078,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1074,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-xs text-slate-600 dark:text-slate-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Sprach-Fortschritt"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1083,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            Math.round(learned.progress * 100),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1084,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1082,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 h-3 w-full rounded-full bg-white/60 dark:bg-slate-900/50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500",
                                                    style: {
                                                        width: `${Math.round(learned.progress * 100)}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1087,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1086,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-sm text-slate-700 dark:text-slate-200",
                                                children: [
                                                    "Gelernte Wörter: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: learned.vocabLearned
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1092,
                                                        columnNumber: 36
                                                    }, this),
                                                    " (Mastered: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: learned.vocabMastered
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1092,
                                                        columnNumber: 77
                                                    }, this),
                                                    ") · Gelernte Sätze: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: learned.sentLearned
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1092,
                                                        columnNumber: 127
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1091,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1081,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1044,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-lg font-semibold",
                                                        children: "Achievements"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1100,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-slate-600 dark:text-slate-400",
                                                        children: [
                                                            "Freigeschaltet: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                className: "text-slate-900 dark:text-slate-100",
                                                                children: data.achievements.filter((a)=>a.unlockedAt).length
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 1102,
                                                                columnNumber: 37
                                                            }, this),
                                                            " / ",
                                                            data.achievements.length
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1101,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1099,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950",
                                                onClick: ()=>evaluateAchievements(),
                                                children: "🔍 prüfen"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 grid gap-3 sm:grid-cols-2",
                                        children: data.achievements.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `rounded-2xl border p-4 shadow-sm ${a.unlockedAt ? "border-emerald-200 bg-white/70 dark:border-emerald-900 dark:bg-slate-950/60" : "border-slate-200 bg-white/50 opacity-80 dark:border-slate-800 dark:bg-slate-950/40"}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 text-xl text-white shadow",
                                                            children: a.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1113,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-semibold",
                                                                    children: [
                                                                        a.title,
                                                                        " ",
                                                                        a.unlockedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200",
                                                                            children: "unlocked"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 1117,
                                                                            columnNumber: 44
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1115,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-slate-600 dark:text-slate-400",
                                                                    children: a.desc
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1121,
                                                                    columnNumber: 25
                                                                }, this),
                                                                a.unlockedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-xs text-slate-500 dark:text-slate-400",
                                                                    children: new Date(a.unlockedAt).toLocaleString()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1122,
                                                                    columnNumber: 42
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1114,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1112,
                                                    columnNumber: 21
                                                }, this)
                                            }, a.id, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 45
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1110,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1097,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-semibold",
                                        children: [
                                            "Analytics – letzte 14 Tage (",
                                            target,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1130,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 overflow-auto rounded-2xl border border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-950/60",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-left text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    className: "bg-gradient-to-r from-sky-100 to-fuchsia-100 text-slate-700 dark:from-slate-900 dark:to-slate-900 dark:text-slate-200",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-3",
                                                                children: "Datum"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 1136,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-3",
                                                                children: "Gelernt"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 1137,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-3",
                                                                children: "Richtig"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 1138,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-3",
                                                                children: "Falsch"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 1139,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "p-3",
                                                                children: "Min"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 1140,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1135,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    className: "divide-y divide-slate-200 dark:divide-slate-800",
                                                    children: last14.map(({ day, s })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-3",
                                                                    children: day
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1148,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-3",
                                                                    children: s.reviewed
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1149,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-3",
                                                                    children: s.correct
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1150,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-3",
                                                                    children: s.wrong
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1151,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "p-3",
                                                                    children: s.minutes
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1152,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, day, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1147,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1143,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1133,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1132,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1129,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1041,
                        columnNumber: 32
                    }, this),
                    view === "settings" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 grid gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Settings"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1161,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-4 md:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-slate-600 dark:text-slate-400",
                                                    children: "Lernsprache"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1166,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 flex flex-wrap gap-2",
                                                    children: [
                                                        "EN",
                                                        "ES",
                                                        "FR",
                                                        "RU"
                                                    ].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setData((prev)=>({
                                                                        ...prev,
                                                                        profile: {
                                                                            ...prev.profile,
                                                                            targetLang: l
                                                                        }
                                                                    }));
                                                                // if no cards exist for that language, seed immediately
                                                                setTimeout(()=>{
                                                                    setData((prev)=>{
                                                                        const has = prev.cards.some((c)=>c.targetLang === l);
                                                                        if (has) return prev;
                                                                        return {
                                                                            ...prev,
                                                                            cards: [
                                                                                ...seedCardsFromPack(l, prev.profile.level, 30),
                                                                                ...prev.cards
                                                                            ]
                                                                        };
                                                                    });
                                                                }, 0);
                                                            },
                                                            className: `rounded-2xl border px-4 py-2 font-semibold shadow-sm hover:shadow ${target === l ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"}`,
                                                            children: l
                                                        }, l, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1168,
                                                            columnNumber: 68
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1167,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 text-xs text-slate-500 dark:text-slate-400",
                                                    children: "Deutsch ist aktuell die Muttersprache (DE)."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1191,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1165,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-slate-600 dark:text-slate-400",
                                                    children: "Level"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1195,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 flex flex-wrap gap-2",
                                                    children: [
                                                        "BEGINNER",
                                                        "INTERMEDIATE",
                                                        "ADVANCED"
                                                    ].map((lv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setData((prev)=>({
                                                                        ...prev,
                                                                        profile: {
                                                                            ...prev.profile,
                                                                            level: lv
                                                                        }
                                                                    })),
                                                            className: `rounded-2xl border px-4 py-2 font-semibold shadow-sm hover:shadow ${data.profile.level === lv ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"}`,
                                                            children: lv === "BEGINNER" ? "Beginner" : lv === "INTERMEDIATE" ? "Intermediate" : "Advanced"
                                                        }, lv, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 86
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1196,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 text-xs text-slate-500 dark:text-slate-400",
                                                    children: "Level steuert nur die Mischung (mehr Wörter vs. mehr Sätze)."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1207,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1194,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-slate-600 dark:text-slate-400",
                                                    children: "Tagesziel"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1211,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: 5,
                                                            max: 200,
                                                            value: data.profile.dailyGoal,
                                                            onChange: (e)=>setData((prev)=>({
                                                                        ...prev,
                                                                        profile: {
                                                                            ...prev.profile,
                                                                            dailyGoal: clamp(Number(e.target.value), 5, 200)
                                                                        }
                                                                    })),
                                                            className: "w-32 rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1213,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "self-center text-sm text-slate-600 dark:text-slate-400",
                                                            children: "Karten / Tag"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1220,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1212,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1210,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-slate-600 dark:text-slate-400",
                                                    children: "Content"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1225,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 flex flex-wrap gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>addMoreStarterCards(25),
                                                            className: "rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90",
                                                            children: "＋ 25 Starter-Karten"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1227,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                if (!confirm("Alles zurücksetzen?")) return;
                                                                const fresh = loadData();
                                                                localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
                                                                setData(fresh);
                                                                setView("today");
                                                            },
                                                            className: "rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-2 font-semibold text-white shadow hover:opacity-90",
                                                            children: "Reset"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1230,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1226,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 text-xs text-slate-500 dark:text-slate-400",
                                                    children: "Nächster Schritt: “Download Packs” (online laden → offline speichern). Kann ich dir als nächstes direkt einbauen."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1240,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1224,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1164,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1163,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-slate-600 dark:text-slate-400",
                                        children: "Palette"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1248,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 flex flex-wrap gap-2",
                                        children: [
                                            "ocean",
                                            "sunset",
                                            "lime",
                                            "grape"
                                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPalette(t),
                                                className: `rounded-2xl border px-4 py-2 font-semibold shadow-sm hover:shadow ${palette === t ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"}`,
                                                children: t
                                            }, t, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1250,
                                                columnNumber: 80
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1249,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1247,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1160,
                        columnNumber: 33
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 881,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BottomNav, {
                view: view,
                setView: setView
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1258,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 880,
        columnNumber: 10
    }, this);
}
_s(Page, "VNx+TcL0CvSdRJJSFGFX6RvsYgI=");
_c = Page;
/** ===========================================
 * Practice (no typing, only choosing)
 * =========================================== */ function Practice({ cards, targetLang, nativeLang, onCorrect, onWrong }) {
    _s1();
    const vocab = cards.filter((c)=>c.kind === "vocab");
    const sentences = cards.filter((c_0)=>c_0.kind === "sentence");
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("wordpick");
    const [choiceCount, setChoiceCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [currentId, setCurrentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Practice.useEffect": ()=>{
            const pool = mode === "wordpick" ? sentences : vocab;
            if (pool[0]) setCurrentId(pool[0].id);
            setFeedback(null);
        }
    }["Practice.useEffect"], [
        mode,
        sentences.length,
        vocab.length
    ]);
    const current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Practice.useMemo[current]": ()=>{
            const pool_0 = mode === "wordpick" ? sentences : vocab;
            return pool_0.find({
                "Practice.useMemo[current]": (x)=>x.id === currentId
            }["Practice.useMemo[current]"]) ?? pool_0[0];
        }
    }["Practice.useMemo[current]"], [
        mode,
        currentId,
        vocab,
        sentences
    ]);
    if (!current) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 rounded-2xl border border-slate-200 bg-[var(--card)] p-6 dark:border-slate-800",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xl font-semibold",
                    children: "Noch keine Karten."
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1298,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2 text-sm text-slate-600 dark:text-slate-400",
                    children: "Geh zu Settings und füge Starter-Karten hinzu."
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1299,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1297,
            columnNumber: 12
        }, this);
    }
    if (mode === "wordpick") {
        const { cloze, answer } = makeCloze(current.front);
        const poolWords = [
            ...sentences.flatMap((s)=>s.front.split(/\s+/).map((w)=>w.replace(/[.,!?;:()"„“”“'’]/g, "")).filter((w_0)=>w_0.length >= 3)),
            ...vocab.map((v)=>v.front)
        ].filter(Boolean);
        const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
            "Practice.useMemo[options]": ()=>makeChoices(answer, poolWords, choiceCount)
        }["Practice.useMemo[options]"], [
            answer,
            poolWords.join("|"),
            choiceCount
        ]);
        const goNext = ()=>{
            setFeedback(null);
            if (sentences.length > 1) setCurrentId(pickRandom(sentences).id);
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 grid gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center justify-between gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeBtn, {
                                    active: mode === "wordpick",
                                    onClick: ()=>{
                                        setMode("wordpick");
                                        setFeedback(null);
                                    },
                                    label: "Wort wählen"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1316,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeBtn, {
                                    active: mode === "mc",
                                    onClick: ()=>{
                                        setMode("mc");
                                        setFeedback(null);
                                    },
                                    label: "Multiple Choice"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1315,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-600 dark:text-slate-400",
                                    children: "Optionen:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1327,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SmallToggle, {
                                    active: choiceCount === 3,
                                    onClick: ()=>setChoiceCount(3),
                                    label: "3"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1328,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SmallToggle, {
                                    active: choiceCount === 5,
                                    onClick: ()=>setChoiceCount(5),
                                    label: "5"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1329,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1326,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1314,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-slate-200 bg-[var(--card)] p-6 shadow-sm dark:border-slate-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-slate-600 dark:text-slate-400",
                                    children: "Wähle das passende Wort:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1335,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90",
                                            onClick: ()=>speak(cloze, TTS_LANG[nativeLang]),
                                            title: "Vorlesen (DE)",
                                            children: "🔊 DE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1337,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90",
                                            onClick: ()=>speak(current.back, TTS_LANG[targetLang]),
                                            title: `Vorlesen (${targetLang})`,
                                            children: [
                                                "🔊 ",
                                                targetLang
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1340,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950",
                                            onClick: stopSpeak,
                                            title: "Stop",
                                            children: "⏹"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1343,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1336,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1334,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 text-2xl font-black",
                            children: cloze
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1349,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 grid gap-3",
                            children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: !!feedback,
                                    className: "rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-left font-semibold shadow-sm hover:shadow disabled:opacity-70 dark:border-slate-800 dark:bg-slate-950/60",
                                    onClick: ()=>{
                                        const ok = opt === answer;
                                        setFeedback({
                                            ok,
                                            correct: answer
                                        });
                                        ok ? onCorrect() : onWrong();
                                        setTimeout(()=>goNext(), ok ? 300 : 900);
                                    },
                                    children: opt
                                }, opt, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1352,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1351,
                            columnNumber: 11
                        }, this),
                        feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `mt-4 rounded-2xl border p-4 ${feedback.ok ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-900/20" : "border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-900/20"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold",
                                    children: feedback.ok ? "✅ Richtig!" : `❌ Falsch – richtig ist: ${feedback.correct}`
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1366,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 text-sm text-slate-700 dark:text-slate-200",
                                    children: [
                                        "Übersetzung: ",
                                        current.back
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1367,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex flex-wrap gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90",
                                            onClick: ()=>speak(current.front, TTS_LANG[nativeLang]),
                                            children: "🔊 Satz (DE)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1369,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90",
                                            onClick: ()=>speak(current.back, TTS_LANG[targetLang]),
                                            children: "🔊 Übersetzung"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1372,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950",
                                            onClick: goNext,
                                            children: "Weiter →"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1375,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1368,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1365,
                            columnNumber: 24
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1333,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1313,
            columnNumber: 12
        }, this);
    }
    // Multiple Choice: choose correct translation
    const choices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Practice.useMemo[choices]": ()=>{
            const pool_1 = vocab.map({
                "Practice.useMemo[choices].pool_1": (v_0)=>v_0.back
            }["Practice.useMemo[choices].pool_1"]);
            return makeChoices(current.back, pool_1, 4);
        }
    }["Practice.useMemo[choices]"], [
        current.id,
        current.back,
        vocab
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 grid gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeBtn, {
                        active: mode === "wordpick",
                        onClick: ()=>{
                            setMode("wordpick");
                            setFeedback(null);
                        },
                        label: "Wort wählen"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeBtn, {
                        active: mode === "mc",
                        onClick: ()=>{
                            setMode("mc");
                            setFeedback(null);
                        },
                        label: "Multiple Choice"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1395,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1390,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-slate-200 bg-[var(--card)] p-6 shadow-sm dark:border-slate-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-slate-600 dark:text-slate-400",
                                children: "Wähle die richtige Übersetzung:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1403,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-sm font-semibold text-white shadow hover:opacity-90",
                                        onClick: ()=>speak(current.front, TTS_LANG[nativeLang]),
                                        title: "Vorlesen (DE)",
                                        children: "🔊 DE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1405,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950",
                                        onClick: stopSpeak,
                                        title: "Stop",
                                        children: "⏹"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1408,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1404,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1402,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 text-2xl font-black",
                        children: current.front
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1414,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid gap-3",
                        children: choices.map((c_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-left font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950/60",
                                onClick: ()=>{
                                    const ok_0 = c_1 === current.back;
                                    ok_0 ? onCorrect() : onWrong();
                                    if (vocab.length > 1) setCurrentId(pickRandom(vocab).id);
                                },
                                children: c_1
                            }, c_1, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1417,
                                columnNumber: 31
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1416,
                        columnNumber: 9
                    }, this),
                    (current.example || current.exampleTranslation) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 rounded-2xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-slate-600 dark:text-slate-300",
                                children: "Beispiel:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1427,
                                columnNumber: 13
                            }, this),
                            current.example && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 font-semibold",
                                children: current.example
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1428,
                                columnNumber: 33
                            }, this),
                            current.exampleTranslation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 text-sm text-slate-600 dark:text-slate-300",
                                children: current.exampleTranslation
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1429,
                                columnNumber: 44
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1426,
                        columnNumber: 61
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1401,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 1389,
        columnNumber: 10
    }, this);
}
_s1(Practice, "/0yujsBhzySUWrKiU+5hC9gxZJ0=");
_c1 = Practice;
/** ===========================================
 * UI
 * =========================================== */ function Header(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(47);
    if ($[0] !== "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89") {
        for(let $i = 0; $i < 47; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89";
    }
    const { view, setView, mode, toggleMode, level, xp, targetLang, streak } = t0;
    let t1;
    if ($[1] !== xp) {
        t1 = computeLevelFromXp(xp);
        $[1] = xp;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const lvl = t1.level;
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-2xl font-black",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-sky-300 dark:via-indigo-300 dark:to-fuchsia-300",
                children: "SprachenlernApp"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1467,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1467,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== targetLang) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
            className: "text-slate-900 dark:text-slate-100",
            children: targetLang
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1474,
            columnNumber: 10
        }, this);
        $[4] = targetLang;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== lvl) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
            className: "text-slate-900 dark:text-slate-100",
            children: lvl
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1482,
            columnNumber: 10
        }, this);
        $[6] = lvl;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    const t5 = level === "BEGINNER" ? "Beginner" : level === "INTERMEDIATE" ? "Intermediate" : "Advanced";
    let t6;
    if ($[8] !== streak) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
            className: "text-slate-900 dark:text-slate-100",
            children: streak
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1491,
            columnNumber: 10
        }, this);
        $[8] = streak;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== t3 || $[11] !== t4 || $[12] !== t5 || $[13] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-slate-600 dark:text-slate-400",
                    children: [
                        "Deutsch → ",
                        t3,
                        " · Level",
                        " ",
                        t4,
                        " · ",
                        t5,
                        " ·",
                        " ",
                        t6,
                        "🔥"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1499,
                    columnNumber: 19
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1499,
            columnNumber: 10
        }, this);
        $[10] = t3;
        $[11] = t4;
        $[12] = t5;
        $[13] = t6;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    const t8 = view === "today";
    let t9;
    if ($[15] !== setView) {
        t9 = ({
            "Header[<TopButton>.onClick]": ()=>setView("today")
        })["Header[<TopButton>.onClick]"];
        $[15] = setView;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== t8 || $[18] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopButton, {
            active: t8,
            onClick: t9,
            label: "Heute"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1521,
            columnNumber: 11
        }, this);
        $[17] = t8;
        $[18] = t9;
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    const t11 = view === "practice";
    let t12;
    if ($[20] !== setView) {
        t12 = ({
            "Header[<TopButton>.onClick]": ()=>setView("practice")
        })["Header[<TopButton>.onClick]"];
        $[20] = setView;
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    let t13;
    if ($[22] !== t11 || $[23] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopButton, {
            active: t11,
            onClick: t12,
            label: "\xDCbungen"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1541,
            columnNumber: 11
        }, this);
        $[22] = t11;
        $[23] = t12;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    const t14 = view === "profile";
    let t15;
    if ($[25] !== setView) {
        t15 = ({
            "Header[<TopButton>.onClick]": ()=>setView("profile")
        })["Header[<TopButton>.onClick]"];
        $[25] = setView;
        $[26] = t15;
    } else {
        t15 = $[26];
    }
    let t16;
    if ($[27] !== t14 || $[28] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopButton, {
            active: t14,
            onClick: t15,
            label: "Profil"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1561,
            columnNumber: 11
        }, this);
        $[27] = t14;
        $[28] = t15;
        $[29] = t16;
    } else {
        t16 = $[29];
    }
    const t17 = view === "settings";
    let t18;
    if ($[30] !== setView) {
        t18 = ({
            "Header[<TopButton>.onClick]": ()=>setView("settings")
        })["Header[<TopButton>.onClick]"];
        $[30] = setView;
        $[31] = t18;
    } else {
        t18 = $[31];
    }
    let t19;
    if ($[32] !== t17 || $[33] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopButton, {
            active: t17,
            onClick: t18,
            label: "Settings"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1581,
            columnNumber: 11
        }, this);
        $[32] = t17;
        $[33] = t18;
        $[34] = t19;
    } else {
        t19 = $[34];
    }
    const t20 = mode === "dark" ? "\uD83C\uDF19 Dark" : "\u2600\uFE0F Light";
    let t21;
    if ($[35] !== t20 || $[36] !== toggleMode) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: toggleMode,
            className: "ml-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm hover:shadow dark:border-slate-800 dark:bg-slate-950",
            title: "Dark Mode umschalten",
            children: t20
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1591,
            columnNumber: 11
        }, this);
        $[35] = t20;
        $[36] = toggleMode;
        $[37] = t21;
    } else {
        t21 = $[37];
    }
    let t22;
    if ($[38] !== t10 || $[39] !== t13 || $[40] !== t16 || $[41] !== t19 || $[42] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden items-center gap-2 md:flex",
            children: [
                t10,
                t13,
                t16,
                t19,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1600,
            columnNumber: 11
        }, this);
        $[38] = t10;
        $[39] = t13;
        $[40] = t16;
        $[41] = t19;
        $[42] = t21;
        $[43] = t22;
    } else {
        t22 = $[43];
    }
    let t23;
    if ($[44] !== t22 || $[45] !== t7) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center justify-between gap-3",
            children: [
                t7,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1612,
            columnNumber: 11
        }, this);
        $[44] = t22;
        $[45] = t7;
        $[46] = t23;
    } else {
        t23 = $[46];
    }
    return t23;
}
_c2 = Header;
function TopButton(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89";
    }
    const { active, onClick, label } = t0;
    const t1 = `rounded-2xl border px-4 py-2 font-semibold shadow-sm hover:shadow ${active ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"}`;
    let t2;
    if ($[1] !== label || $[2] !== onClick || $[3] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClick,
            className: t1,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1637,
            columnNumber: 10
        }, this);
        $[1] = label;
        $[2] = onClick;
        $[3] = t1;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_c3 = TopButton;
function BottomNav(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(26);
    if ($[0] !== "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89") {
        for(let $i = 0; $i < 26; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89";
    }
    const { view, setView } = t0;
    const t1 = view === "today";
    let t2;
    if ($[1] !== setView) {
        t2 = ({
            "BottomNav[<NavBtn>.onClick]": ()=>setView("today")
        })["BottomNav[<NavBtn>.onClick]"];
        $[1] = setView;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== t1 || $[4] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavBtn, {
            active: t1,
            onClick: t2,
            label: "Heute"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1672,
            columnNumber: 10
        }, this);
        $[3] = t1;
        $[4] = t2;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    const t4 = view === "practice";
    let t5;
    if ($[6] !== setView) {
        t5 = ({
            "BottomNav[<NavBtn>.onClick]": ()=>setView("practice")
        })["BottomNav[<NavBtn>.onClick]"];
        $[6] = setView;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t4 || $[9] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavBtn, {
            active: t4,
            onClick: t5,
            label: "\xDCbungen"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1692,
            columnNumber: 10
        }, this);
        $[8] = t4;
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    const t7 = view === "profile";
    let t8;
    if ($[11] !== setView) {
        t8 = ({
            "BottomNav[<NavBtn>.onClick]": ()=>setView("profile")
        })["BottomNav[<NavBtn>.onClick]"];
        $[11] = setView;
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] !== t7 || $[14] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavBtn, {
            active: t7,
            onClick: t8,
            label: "Profil"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1712,
            columnNumber: 10
        }, this);
        $[13] = t7;
        $[14] = t8;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    const t10 = view === "settings";
    let t11;
    if ($[16] !== setView) {
        t11 = ({
            "BottomNav[<NavBtn>.onClick]": ()=>setView("settings")
        })["BottomNav[<NavBtn>.onClick]"];
        $[16] = setView;
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    let t12;
    if ($[18] !== t10 || $[19] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavBtn, {
            active: t10,
            onClick: t11,
            label: "Settings"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1732,
            columnNumber: 11
        }, this);
        $[18] = t10;
        $[19] = t11;
        $[20] = t12;
    } else {
        t12 = $[20];
    }
    let t13;
    if ($[21] !== t12 || $[22] !== t3 || $[23] !== t6 || $[24] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 md:hidden",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto grid max-w-5xl grid-cols-4 gap-1 p-2",
                children: [
                    t3,
                    t6,
                    t9,
                    t12
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1741,
                columnNumber: 163
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1741,
            columnNumber: 11
        }, this);
        $[21] = t12;
        $[22] = t3;
        $[23] = t6;
        $[24] = t9;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    return t13;
}
_c4 = BottomNav;
function NavBtn(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89";
    }
    const { active, onClick, label } = t0;
    const t1 = `rounded-2xl border px-2 py-2 text-sm font-semibold shadow-sm ${active ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"}`;
    let t2;
    if ($[1] !== label || $[2] !== onClick || $[3] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClick,
            className: t1,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1768,
            columnNumber: 10
        }, this);
        $[1] = label;
        $[2] = onClick;
        $[3] = t1;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_c5 = NavBtn;
function CardShell(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89";
    }
    const { children } = t0;
    let t1;
    if ($[1] !== children) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-2xl border border-slate-200 bg-[var(--card)] p-5 shadow-sm dark:border-slate-800",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1791,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    return t1;
}
_c6 = CardShell;
function Pill(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89";
    }
    const { children } = t0;
    let t1;
    if ($[1] !== children) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-sm font-semibold text-white shadow",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1812,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    return t1;
}
_c7 = Pill;
function FancyBtn(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89";
    }
    const { variant, onClick, label } = t0;
    const cls = variant === "good" ? "from-emerald-500 to-teal-500" : "from-rose-500 to-orange-500";
    const t1 = `rounded-2xl bg-gradient-to-r ${cls} px-4 py-3 font-semibold text-white shadow hover:opacity-90`;
    let t2;
    if ($[1] !== label || $[2] !== onClick || $[3] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClick,
            className: t1,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1837,
            columnNumber: 10
        }, this);
        $[1] = label;
        $[2] = onClick;
        $[3] = t1;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_c8 = FancyBtn;
function Stat(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89";
    }
    const { label, value, suffix } = t0;
    let t1;
    if ($[1] !== label) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm text-slate-600 dark:text-slate-400",
            children: label
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1862,
            columnNumber: 10
        }, this);
        $[1] = label;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== suffix) {
        t2 = suffix ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ml-1 text-base font-semibold",
            children: suffix
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1870,
            columnNumber: 19
        }, this) : null;
        $[3] = suffix;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t2 || $[6] !== value) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-2xl font-black bg-gradient-to-r from-sky-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-sky-300 dark:to-fuchsia-300",
            children: [
                value,
                t2
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1878,
            columnNumber: 10
        }, this);
        $[5] = t2;
        $[6] = value;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== t1 || $[9] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60",
            children: [
                t1,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1887,
            columnNumber: 10
        }, this);
        $[8] = t1;
        $[9] = t3;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    return t4;
}
_c9 = Stat;
function ModeBtn(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89";
    }
    const { active, onClick, label } = t0;
    const t1 = `rounded-2xl border px-4 py-2 font-semibold ${active ? "bg-indigo-50 dark:bg-slate-900" : "bg-white dark:bg-slate-950"} border-slate-200 shadow-sm hover:shadow dark:border-slate-800`;
    let t2;
    if ($[1] !== label || $[2] !== onClick || $[3] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClick,
            className: t1,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1912,
            columnNumber: 10
        }, this);
        $[1] = label;
        $[2] = onClick;
        $[3] = t1;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_c10 = ModeBtn;
function SmallToggle(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1c3c479cc3234d1b62ed4bc3ed9d90cf55b25428526d1dc2077c9dc7a1d35d89";
    }
    const { active, onClick, label } = t0;
    const t1 = `rounded-2xl border px-3 py-1 text-sm font-semibold shadow-sm hover:shadow dark:border-slate-800 ${active ? "border-indigo-200 bg-indigo-50 dark:bg-slate-900" : "border-slate-200 bg-white dark:bg-slate-950"}`;
    let t2;
    if ($[1] !== label || $[2] !== onClick || $[3] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onClick,
            className: t1,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1938,
            columnNumber: 10
        }, this);
        $[1] = label;
        $[2] = onClick;
        $[3] = t1;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_c11 = SmallToggle;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Page");
__turbopack_context__.k.register(_c1, "Practice");
__turbopack_context__.k.register(_c2, "Header");
__turbopack_context__.k.register(_c3, "TopButton");
__turbopack_context__.k.register(_c4, "BottomNav");
__turbopack_context__.k.register(_c5, "NavBtn");
__turbopack_context__.k.register(_c6, "CardShell");
__turbopack_context__.k.register(_c7, "Pill");
__turbopack_context__.k.register(_c8, "FancyBtn");
__turbopack_context__.k.register(_c9, "Stat");
__turbopack_context__.k.register(_c10, "ModeBtn");
__turbopack_context__.k.register(_c11, "SmallToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_page_tsx_b4090435._.js.map