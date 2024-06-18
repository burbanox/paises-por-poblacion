import { seleccionarPreguntasAleatorias } from "./preguntas.js";

let carruselContenedor = document.getElementById("carrusel-quiz");
let button = document.getElementById("button-quiz");
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
let portadaQuiz = document.getElementById("quiz-portada");
let nextButton = document.getElementById("nextButton");
let prevButton = document.getElementById("prevButton");
let finishButton = document.getElementById("finishButton");
let botonReiniciar = document.getElementById("boton-reiniciar")
let portadaFinalizar = document.getElementById("portada-finalizar")

function logicaReiniciar() {
  portadaFinalizar.classList.add("desaparecer");
  portadaQuiz.classList.remove("desaparecer")
  button.classList.remove("desaparecer")
}

botonReiniciar.addEventListener("click",logicaReiniciar)

nextButton.addEventListener("click", function () {
  plusSlides(1);
});

prevButton.addEventListener("click", function () {
  plusSlides(-1);
});

finishButton.addEventListener("click", finishQuiz);

let slideIndex = 1;

function llenarPreguntas(preguntaSeleccionadas){
  let enunciados = document.getElementsByClassName("quiz-title")

  for(let i=0;i<preguntaSeleccionadas.length;i++){
    enunciados[i].textContent = preguntaSeleccionadas[i]['enunciado_pregunta']
  }

  for(let i=0;i<preguntaSeleccionadas.length;i++){
    let opciones = document.getElementsByClassName("pregunta-" + i)

    for(let j=0;j<opciones.length;j++){
      opciones[j].textContent = preguntaSeleccionadas[i]['opciones'][j]['textoOpcion']
    }
  }


}

function activarQuiz() {
  portadaQuiz.className += " desaparecer";
  carruselContenedor.classList.remove("desaparecer");
  button.className += " desaparecer";
  let preguntaSeleccionadas = seleccionarPreguntasAleatorias()

  slideIndex = 1

  showSlides(slideIndex);

  llenarPreguntas(preguntaSeleccionadas)
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
    carruselContenedor.classList.add("desaparecer");
    portadaFinalizar.classList.remove("desaparecer")
  }
}
