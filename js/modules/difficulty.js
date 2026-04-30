/* ============================================================
    AUTOR: Kelly
   ============================================================ */
"use strict";
var DifficultyManager = (function () {

  /* Variable interna: guarda la dificultad actual del juego */
  var dificultadActual = "easy";


  /* ── Obtener la configuración de la dificultad actual ────────
     ─────────────────────────────────────────────────────────── */
  function obtenerConfiguracion() {
    return DIFFICULTY_CONFIG[dificultadActual];
  }


  /* ── Cambiar la dificultad activa ────────────────────────────
     ─────────────────────────────────────────────────────────── */
  function cambiarDificultad(nivel) {

    /* Verificamos que ese nivel exista en la configuración */
    if (!DIFFICULTY_CONFIG[nivel]) {
      console.log("Nivel no válido:", nivel);
      return;
    }

    dificultadActual = nivel;

    return obtenerConfiguracion();
  }


  /* ── Obtener el nombre de la dificultad actual ───────────────
     ─────────────────────────────────────────────────────────── */
  function obtenerActual() {
    return dificultadActual;
  }


  /* ── Actualizar el HUD con la dificultad actual ──────────────
     ─────────────────────────────────────────────────────────── */
  function actualizarHUD() {

    var elementoHUD = document.getElementById("hud-diff");

    if (!elementoHUD) {
      return;
    }

    var config = obtenerConfiguracion();

    elementoHUD.textContent = config.label;
    elementoHUD.className   = "rank-diff " + dificultadActual;
  }


  /* ── Mostrar las tarjetas de dificultad en pantalla ──────────
     ─────────────────────────────────────────────────────────── */
  function mostrarTarjetas(callback) {

    var grid = document.getElementById("diff-grid");

    if (!grid) {
      return;
    }

    /* Limpiamos las tarjetas anteriores */
    grid.innerHTML = "";

    /* Obtenemos los nombres de los niveles: ["easy","medium","hard"] */
    var niveles = Object.keys(DIFFICULTY_CONFIG);

    /* Creamos una tarjeta por cada nivel */
    for (var i = 0; i < niveles.length; i++) {

      var nivel  = niveles[i];
      var config = DIFFICULTY_CONFIG[nivel];

      /* Creamos el div de la tarjeta */
      var tarjeta = document.createElement("div");
      tarjeta.className = "diff-card panel " + nivel;

      /* Elegimos el emoji de velocidad según el nivel */
      var textoVelocidad = "";
      if (nivel === "easy") {
        textoVelocidad = "🐢 Baja";
      } else if (nivel === "medium") {
        textoVelocidad = "🐇 Media";
      } else {
        textoVelocidad = "🚀 Alta";
      }

      /* Construimos el HTML interno de la tarjeta */
      tarjeta.innerHTML =
        "<span class='diff-icon'>" + config.icon  + "</span>" +
        "<div class='diff-name'>"  + config.label + "</div>"  +
        "<div class='diff-desc'>"  +
          "Vidas: "            + "❤️".repeat(config.livesStart) + "<br>" +
          "Velocidad: "        + textoVelocidad                 + "<br>" +
          "Puntos/captura: <strong>" + config.pointsPerCatch + "</strong>" +
        "</div>";

      /* Al hacer clic en la tarjeta, guardamos el nivel y llamamos al callback */
      tarjeta.addEventListener("click", function (nivelElegido) {
        /* Usamos una función que devuelve otra función para
           "capturar" el valor de nivelElegido en este bucle */
        return function () {
          AudioManager.playClick();
          cambiarDificultad(nivelElegido);

          if (callback) {
            callback(nivelElegido);
          }
        };
      }(nivel));   /* Pasamos el nivel como argumento inmediatamente */

      grid.appendChild(tarjeta);
    }
  }


  /* ── Funciones públicas del módulo ───────────────────────────
     ─────────────────────────────────────────────────────────── */
  return {
    getConfig:      obtenerConfiguracion,
    set:            cambiarDificultad,
    getCurrent:     obtenerActual,
    updateHUDBadge: actualizarHUD,
    renderCards:    mostrarTarjetas
  };

})();