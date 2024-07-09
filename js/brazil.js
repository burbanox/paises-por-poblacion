import { data } from "./paises.js";

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
