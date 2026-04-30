  /* ============================================================
    AUTOR: Jean Paul Moncada
    ============================================================ */
"use strict";
var listaDePantallas = [
  "screens/screen-intro.html",
  "screens/screen-difficulty.html",
  "screens/screen-game.html",
  "screens/screen-pause.html",
  "screens/screen-gameover.html",
  "screens/screen-ranking.html",
  "screens/screen-rules.html",
  "screens/screen-credits.html"
];


  /* ── Cargar un archivo HTML e insertarlo en el contenedor ────
    ─────────────────────────────────────────────────────────── */
function cargarUnaPantalla(archivo, contenedor, siguiente) {

  fetch(archivo)
    .then(function (respuesta) {

      /* Convertimos la respuesta a texto HTML */
      return respuesta.text();
    })
    .then(function (codigoHTML) {

      /* Pegamos el HTML al final del #app */
      contenedor.insertAdjacentHTML("beforeend", codigoHTML);

      /* Llamamos al siguiente paso */
      siguiente();
    })
    .catch(function () {

      /* Si el archivo no se encontró, avisamos y seguimos igual */
      console.warn("No se pudo cargar:", archivo);
      siguiente();
    });
}


  /* ── Cargar todas las pantallas una por una ──────────────────
    ─────────────────────────────────────────────────────────── */
function cargarTodasLasPantallas(indice, contenedor) {

  /* Si ya cargamos todas, lanzamos el evento "screensReady" */
  if (indice >= listaDePantallas.length) {
    document.dispatchEvent(new Event("screensReady"));
    return;
  }

  /* Tomamos el archivo que corresponde a este índice */
  var archivoActual = listaDePantallas[indice];

  /* Cargamos ese archivo y al terminar pasamos al siguiente */
  cargarUnaPantalla(archivoActual, contenedor, function () {
    cargarTodasLasPantallas(indice + 1, contenedor);
  });
}


  /* ── Arrancar cuando el HTML de la página esté listo ─────────
    ─────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {

  /* Buscamos el contenedor principal */
  var contenedorApp = document.getElementById("app");

  /* Si no existe el #app, no hacemos nada */
  if (!contenedorApp) {
    return;
  }

  /* Empezamos a cargar desde el primer archivo (índice 0) */
  cargarTodasLasPantallas(0, contenedorApp);
});