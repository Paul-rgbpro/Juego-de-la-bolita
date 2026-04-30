/* ============================================================
  AUTOR: Nilton
   ============================================================ */
"use strict";
/* ── Configuración de cada nivel de dificultad ──────────────
─────────────────────────────────────────────────────────── */
var DIFFICULTY_CONFIG = {

  easy: {
    label: "FÁCIL",
    icon: "🟢",
    ballSpeed: 2.8,
    speedIncrement: 0.18,
    ballRadius: 28,
    livesStart: 5,
    pointsPerCatch: 10,
    color: "easy",
    maxSpeed: 9
  },

  medium: {
    label: "MEDIO",
    icon: "🟡",
    ballSpeed: 4.5,
    speedIncrement: 0.28,
    ballRadius: 22,
    livesStart: 3,
    pointsPerCatch: 20,
    color: "medium",
    maxSpeed: 14
  },

  hard: {
    label: "DIFÍCIL",
    icon: "🔴",
    ballSpeed: 6.5,
    speedIncrement: 0.4,
    ballRadius: 16,
    livesStart: 2,
    pointsPerCatch: 35,
    color: "hard",
    maxSpeed: 20
  }

};

/* ── Lista de insignias del juego ────────────────────────────
   ─────────────────────────────────────────────────────────── */
var BADGES = [

  {
    id: "novato",
    icon: "🌱",
    name: "NOVATO",
    desc: "Primera partida completada",
    condition: function (stats) {
      return stats.gamesPlayed >= 1;
    }
  },

  {
    id: "guerrero",
    icon: "⚔️",
    name: "GUERRERO",
    desc: "Captura 20 bolas en una partida",
    condition: function (stats) {
      return stats.catchesThisGame >= 20;
    }
  },

  {
    id: "heroe",
    icon: "🦸",
    name: "HÉROE",
    desc: "Alcanza 500 puntos",
    condition: function (stats) {
      return stats.scoreThisGame >= 500;
    }
  },

  {
    id: "leyenda",
    icon: "🏆",
    name: "LEYENDA",
    desc: "Alcanza 1000 puntos",
    condition: function (stats) {
      return stats.scoreThisGame >= 1000;
    }
  },

  {
    id: "superviviente",
    icon: "💀",
    name: "SUPERVIVIENTE",
    desc: "Termina con todas las vidas en difícil",
    condition: function (stats) {
      return stats.difficulty === "hard" && stats.livesLeft >= 2;
    }
  },

  {
    id: "veloz",
    icon: "⚡",
    name: "VELOZ",
    desc: "10 capturas con bonus de tiempo",
    condition: function (stats) {
      return stats.timeBonuses >= 10;
    }
  },

  {
    id: "maestro",
    icon: "🎯",
    name: "MAESTRO",
    desc: "50 capturas en total (acumulado)",
    condition: function (stats) {
      return stats.totalCatches >= 50;
    }
  },

  {
    id: "cosmonaut",
    icon: "🚀",
    name: "COSMONAUTA",
    desc: "Juega en los 3 niveles de dificultad",
    condition: function (stats) {
      return stats.difficultiesPlayed && stats.difficultiesPlayed.size >= 3;
    }
  }

];
/* ── Configuración del ranking ───────────────────────────────
   ─────────────────────────────────────────────────────────── */
var RANKING_CONFIG = {
  storageKey: "capturaLaBolita_ranking",
  maxEntries: 10
};


/* ── Créditos del equipo ─────────────────────────────────────
   ─────────────────────────────────────────────────────────── */
var CREDITS = [
  { name: "ESTUDIANTE 1", role: "Jean Paul Moncada", avatar: "👾", color: "#00d4ff" },
  { name: "ESTUDIANTE 2", role: "Kelly",             avatar: "🎮", color: "#ff4fcf" },
  { name: "ESTUDIANTE 3", role: "Nilton",            avatar: "🎨", color: "#ffe44d" },
  { name: "ESTUDIANTE 4", role: "Franco",            avatar: "🎵", color: "#00ff88" }
];