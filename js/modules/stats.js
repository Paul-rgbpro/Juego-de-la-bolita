/* ============================================================
  AUTOR: Nilton
   ============================================================ */
"use strict";
var StatsManager = (function () {

  /* Nombre de la clave en localStorage donde guardamos los datos */
  var CLAVE_GUARDADO = "capturaLaBolita_stats";


  /* ── Obtener las estadísticas guardadas ──────────────────────
     ─────────────────────────────────────────────────────────── */
  function obtenerTodo() {

    /* Leemos el texto guardado en localStorage */
    var textoGuardado = localStorage.getItem(CLAVE_GUARDADO);

    /* Si existe, lo convertimos de texto a objeto */
    if (textoGuardado) {
      var estadisticas = JSON.parse(textoGuardado);

      /* Nos aseguramos de que los campos existan */
      if (!estadisticas.gamesPlayed) {
        estadisticas.gamesPlayed = 0;
      }
      if (!estadisticas.totalCatches) {
        estadisticas.totalCatches = 0;
      }
      if (!estadisticas.difficultiesPlayed) {
        estadisticas.difficultiesPlayed = [];
      }

      return estadisticas;
    }

    /* Si no hay datos, devolvemos estadísticas vacías */
    var estadisticasVacias = {
      gamesPlayed: 0,
      totalCatches: 0,
      difficultiesPlayed: []
    };

    return estadisticasVacias;
  }


  /* ── Guardar las estadísticas ────────────────────────────────
     ─────────────────────────────────────────────────────────── */
  function guardar(estadisticas) {

    /* Nos aseguramos de que difficultiesPlayed sea un array */
    if (!Array.isArray(estadisticas.difficultiesPlayed)) {
      estadisticas.difficultiesPlayed = [];
    }

    /* Guardamos el objeto como texto en localStorage */
    var textoParaGuardar = JSON.stringify(estadisticas);
    localStorage.setItem(CLAVE_GUARDADO, textoParaGuardar);
  }


  /* ── Reiniciar todas las estadísticas ────────────────────────
     ─────────────────────────────────────────────────────────── */
  function reiniciar() {
    var estadisticasVacias = {
      gamesPlayed: 0,
      totalCatches: 0,
      difficultiesPlayed: []
    };

    guardar(estadisticasVacias);
  }


  /* ── Funciones públicas del módulo ───────────────────────────
     ─────────────────────────────────────────────────────────── */
  return {
    getAll: obtenerTodo,
    save:   guardar,
    clear:  reiniciar
  };

})();