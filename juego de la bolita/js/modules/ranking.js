/* ============================================================
  UTOR: Kelly
   ============================================================ */
"use strict";
var RankingManager = (function () {


  /* ── Obtener toda la lista del ranking ───────────────────────
     ─────────────────────────────────────────────────────────── */
  function obtenerTodos() {

    var textoGuardado = localStorage.getItem(RANKING_CONFIG.storageKey);

    if (textoGuardado) {
      return JSON.parse(textoGuardado);
    }

    return [];
  }


  /* ── Guardar toda la lista en localStorage ───────────────────.
     ─────────────────────────────────────────────────────────── */
  function guardarTodos(lista) {
    var textoParaGuardar = JSON.stringify(lista);
    localStorage.setItem(RANKING_CONFIG.storageKey, textoParaGuardar);
  }


  /* ── Agregar un jugador al ranking ───────────────────────────
     ─────────────────────────────────────────────────────────── */
  function agregarJugador(nombre, puntaje, dificultad, capturas) {

    var lista = obtenerTodos();

    /* Limpiamos el nombre y ponemos "ANONIMO" si está vacío */
    var nombreLimpio = nombre.trim().toUpperCase();
    if (nombreLimpio === "") {
      nombreLimpio = "ANONIMO";
    }

    /* Limitamos el nombre a 12 caracteres */
    nombreLimpio = nombreLimpio.slice(0, 12);

    /* Creamos el objeto del nuevo jugador */
    var nuevoJugador = {
      name:       nombreLimpio,
      score:      puntaje,
      difficulty: dificultad,
      catches:    capturas,
      date:       new Date().toLocaleDateString()
    };

    /* Añadimos el nuevo jugador a la lista */
    lista.push(nuevoJugador);

    /* Ordenamos la lista de mayor a menor puntaje
       Usamos el algoritmo de burbuja (dos bucles anidados) */
    for (var i = 0; i < lista.length; i++) {
      for (var j = i + 1; j < lista.length; j++) {

        /* Si el de abajo tiene más puntos, los intercambiamos */
        if (lista[j].score > lista[i].score) {
          var temporal = lista[i];
          lista[i]     = lista[j];
          lista[j]     = temporal;
        }
      }
    }

    /* Cortamos la lista al máximo permitido */
    var listaFinal = [];
    for (var k = 0; k < RANKING_CONFIG.maxEntries; k++) {
      if (lista[k]) {
        listaFinal.push(lista[k]);
      }
    }

    guardarTodos(listaFinal);

    return listaFinal;
  }


  /* ── Obtener el mejor puntaje ─────────────────────────────── */
  function obtenerMejor() {

    var lista = obtenerTodos();

    /* Si hay jugadores, el primero siempre es el mejor (ya está ordenado) */
    if (lista.length > 0) {
      return lista[0].score;
    }

    return 0;
  }


  /* ── Saber en qué posición entraría un puntaje ───────────────
     ─────────────────────────────────────────────────────────── */
  function obtenerPosicion(puntaje) {

    var lista = obtenerTodos();

    for (var i = 0; i < lista.length; i++) {
      if (puntaje >= lista[i].score) {
        return i + 1;   /* +1 porque las posiciones empiezan en 1 */
      }
    }

    /* Si no entra antes de nadie, va al final */
    return lista.length + 1;
  }


  /* ── Borrar todo el ranking ──────────────────────────────────
     ─────────────────────────────────────────────────────────── */
  function borrarTodo() {
    guardarTodos([]);
  }


  /* ── Mostrar el ranking en pantalla ──────────────────────────
     ─────────────────────────────────────────────────────────── */
  function mostrarEnPantalla(idContenedor) {

    var contenedor = document.getElementById(idContenedor);
    if (!contenedor) {
      return;
    }

    var lista = obtenerTodos();

    /* Vaciamos el contenedor antes de rellenar */
    contenedor.innerHTML = "";

    /* Si no hay jugadores, mostramos un mensaje */
    if (lista.length === 0) {
      contenedor.innerHTML = "<div class='ranking-empty'>⭐ Sé el primero en el ranking</div>";
      return;
    }

    /* Emojis para los 3 primeros puestos */
    var medallas = ["🥇", "🥈", "🥉"];

    /* Creamos una fila por cada jugador */
    for (var i = 0; i < lista.length; i++) {

      var jugador = lista[i];

      /* Usamos medalla si está entre los 3 primeros */
      var posicion = "";
      if (i < 3) {
        posicion = medallas[i];
      } else {
        posicion = "#" + (i + 1);
      }

      /* Creamos el elemento div para esta fila */
      var fila = document.createElement("div");
      fila.className = "ranking-item";

      /* Armamos el HTML interno de la fila */
      fila.innerHTML =
        "<div class='rank-pos'>"   + posicion           + "</div>" +
        "<div class='rank-name'>"  + jugador.name       + "</div>" +
        "<div class='rank-diff'>"  + jugador.difficulty + "</div>" +
        "<div class='rank-score'>" + jugador.score      + "</div>";

      contenedor.appendChild(fila);
    }
  }


  /* ── Funciones públicas del módulo ───────────────────────────
     ─────────────────────────────────────────────────────────── */
  return {
    getAll:      obtenerTodos,
    addEntry:    agregarJugador,
    getBest:     obtenerMejor,
    getPosition: obtenerPosicion,
    clear:       borrarTodo,
    render:      mostrarEnPantalla
  };

})();