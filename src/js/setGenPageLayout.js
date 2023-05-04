import { createGeneralDiv, createFirstLevel } from "./createElement.js";

export function setGenPageLayout() {
  createGeneralDiv("div", "main-div"); //(tagHtml, className) creo il div principale non mi piace usare body

  createFirstLevel("header", "header", ""); //(tagHtml, className, content) // creo Header

  createFirstLevel("div", "core-div", " "); //(tagHtml, className, content) // creao il div centrale dove ci saranno
  // tutte le news , in realta' le stesse news saranno wrappate in div di x(10) news alla volta per farle apparire a blocchi di 10 (x)
  createFirstLevel("div", "btn-container", ""); //(tagHtml, className, content) // creo il bottone load-more

  createFirstLevel(
    "footer",
    "footer",
    "-CLAUDIO DALL'ARA-FOR STAR2IMPACT JAVASCRIPT ADVANCED COURSE-"
  ); // creo il footer

  const titleEl = document.createElement("p");
  titleEl.innerHTML = "THE HACKER NEWS";
  document.getElementById("header").appendChild(titleEl);

  /////////////// BTN-CONTAINER
  const loadMoreEl = document.createElement("div");
  loadMoreEl.classList.add("load-more");
  loadMoreEl.setAttribute("id", "load-more");
  loadMoreEl.innerHTML = "LOADING ...";
  document.getElementById("btn-container").appendChild(loadMoreEl);

  /////////////////SPINNER
  const spinnerContainer = document.createElement("div");
  spinnerContainer.classList.add("spinner-container");
  spinnerContainer.setAttribute("id", "spinner-container");
  document.getElementById("btn-container").appendChild(spinnerContainer);

  const spinnerElement = document.createElement("div");
  spinnerElement.classList.add("spinner");
  spinnerElement.setAttribute("id", "spinner");
  document.getElementById("spinner-container").appendChild(spinnerElement);
  const spinnerHeadEl = document.createElement("div"); //  creo l'head che e' parte dello spinner
  spinnerHeadEl.classList.add("spinner-head");
  spinnerHeadEl.setAttribute("id", "spinner-head");
  document.getElementById("spinner").appendChild(spinnerHeadEl);
}
