import { data } from "../paises.js";
import { seleccionarPreguntasAleatorias } from "./preguntas-australia.js";

const NAV_BUTTON = document.getElementById("nav-button");
const NAV = document.getElementById("nav");
const MENU = document.getElementById("menu-icono");

const searchButton = document.getElementById("searchButton");
const resultDiv = document.getElementById("result");
const searchInput = document.getElementById("searchInput");

MENU.addEventListener("click", () => {
  NAV.classList.remove("desaparecer");
});
NAV_BUTTON.addEventListener("click", () => {
  NAV.classList.add("desaparecer");
});

const SEARCH_BUTTON = document.getElementById("search-close-button");
const SEARCH_CONTAINER = document.getElementById("search");
const SEARCH_ICONO = document.getElementById("search-icono");

SEARCH_ICONO.addEventListener("click", () => {
  SEARCH_CONTAINER.classList.remove("desaparecer");
});
SEARCH_BUTTON.addEventListener("click", () => {
  SEARCH_CONTAINER.classList.add("desaparecer");
  resultDiv.classList.add("desaparecer");
  searchInput.value = "";
});

searchButton.addEventListener("click", function () {
  const query = searchInput.value.toLowerCase();
  resultDiv.classList.remove("desaparecer");
  performSearch(query);
});

function performSearch(query) {
  let results = [];

  // Buscar en continentes y países
  for (let continent in data) {
    if (continent.toLowerCase().includes(query)) {
      results.push(`<strong>${continent}</strong>`);
      results.push(
        ...data[continent].map(
          (country) =>
            `<a href="${country.url}" id="etiqueta-pais">${country.nombre}</a>`
        )
      );
    } else if (Array.isArray(data[continent])) {
      const matchingCountries = data[continent].filter((country) =>
        country.nombre.toLowerCase().includes(query)
      );
      if (matchingCountries.length > 0) {
        results.push(`<strong>${continent}</strong>`);
        results.push(
          ...matchingCountries.map(
            (country) => `<a href="${country.url}">${country.nombre}</a>`
          )
        );
      }
    }
  }

  // Mostrar los resultados
  resultDiv.innerHTML = results.length
    ? results.join("<br>")
    : "No se encontraron resultados.";
}


let carruselContenedor = document.getElementById("carrusel-quiz");
let button = document.getElementById("button-quiz");
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
let portadaQuiz = document.getElementById("quiz-portada");
let nextButton = document.getElementById("nextButton");
let prevButton = document.getElementById("prevButton");
let finishButton = document.getElementById("finishButton");
let botonReiniciar = document.getElementById("boton-reiniciar");
let portadaFinalizar = document.getElementById("portada-finalizar");
let textoPuntajes = document.getElementById("puntos");


let preguntaSeleccionadas = [];

function logicaReiniciar() {
  portadaFinalizar.classList.add("desaparecer");
  portadaQuiz.classList.remove("desaparecer");
  button.classList.remove("desaparecer");
}

botonReiniciar.addEventListener("click", logicaReiniciar);

nextButton.addEventListener("click", function () {
  plusSlides(1);
});

prevButton.addEventListener("click", function () {
  plusSlides(-1);
});

finishButton.addEventListener("click", finishQuiz);

let slideIndex = 1;

function llenarPreguntas(preguntaSeleccionadas) {
  let enunciados = document.getElementsByClassName("quiz-title");

  for (let i = 0; i < preguntaSeleccionadas.length; i++) {
    enunciados[i].textContent = preguntaSeleccionadas[i]["enunciado_pregunta"];
  }

  for (let i = 0; i < preguntaSeleccionadas.length; i++) {
    let opciones = document.getElementsByClassName("pregunta-" + i);

    for (let j = 0; j < opciones.length; j++) {
      opciones[j].textContent =
        preguntaSeleccionadas[i]["opciones"][j]["textoOpcion"];
    }
  }
}

function getSelecciones() {
  let arr = [];

  for (let i = 1; i <= 5; i++) {
    let respuestas = [];
    let radio = document.getElementsByName("pregunta_" + i);

    for (let j = 0; j < 4; j++) {
      console.log(radio);
      respuestas.push(radio[j].checked);
    }

    arr.push(respuestas);
  }

  return arr;
}

function puntaje(seleccionadas) {
  let puntajeFinal = 0;
  let diferentes = false;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        !(
          preguntaSeleccionadas[i]["opciones"][j]["respuestaCorrecta"] ==
          seleccionadas[i][j]
        )
      ) {
        diferentes = true;
        break;
      }
    }

    if (!diferentes) {
      puntajeFinal += 20;
    }
  }
  return puntajeFinal;
}

function activarQuiz() {
  portadaQuiz.classList.add("desaparecer");
  carruselContenedor.classList.remove("desaparecer");
  button.className += " desaparecer";
  preguntaSeleccionadas = seleccionarPreguntasAleatorias();

  $("input[type=radio]").prop("checked", false);

  slideIndex = 1;

  showSlides(slideIndex);

  llenarPreguntas(preguntaSeleccionadas);
}

button.addEventListener("click", activarQuiz);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  slides = document.getElementsByClassName("mySlides");
  dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function verificarSeleccion(radios) {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return true;
    }
  }

  return false;
}

function finishQuiz() {
  let forms = document.getElementsByClassName("contenedor-preguntas");
  let mensajeError = "";
  let seleccionIncompleta = false;

  for (let i = 1; i <= forms.length; i++) {
    let preguntas = document.getElementsByName("pregunta_" + i);

    if (!verificarSeleccion(preguntas)) {
      mensajeError +=
        "Por favor selelcciona una opcion en la pregunta " + i + "\n";
      seleccionIncompleta = true;
    }
  }

  if (seleccionIncompleta) {
    alert(mensajeError);
  } else {
    let selecciones = getSelecciones();
    let puntos = puntaje(selecciones);

    carruselContenedor.classList.add("desaparecer");
    portadaFinalizar.classList.remove("desaparecer");

    textoPuntajes.textContent = puntos + "%";

    console.log(puntos);
  }
}


