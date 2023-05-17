import {
  createOneNewsEl,
  ///////////////////
  createPageContainer,
  ///////////////////
} from "./createElement.js";
import { convertTime } from "./convertTime.js";
import { setGenPageLayout } from "./setGenPageLayout.js";

import axios, { isCancel, AxiosError } from "axios"; // import axios
import "../scss/main.scss"; // import scss for webpack

//LODASH SECTION
//lodash installation //
const _ = require("lodash");
//test lodash installation //
/* const ver = _.VERSION;
console.log(ver); */
/////////////////////////////

const API_500_NEWS = "https://hacker-news.firebaseio.com/v0/newstories.json"; // define API_500 const
const API_ONE_NEWS = "https://hacker-news.firebaseio.com/v0/item/"; // define fix part of One news Api const https://hacker-news.firebaseio.com/v0/item/35879783.json

let actual_index = 0; // inizalmente ho l'indice di notize "date" a 0
let news_per_page = 10; // come da richiesta verranno visualizzate 10 news alla volta
let obj500 = {}; // inializzo l'oggetto di risposta alla prima api per averla disponibile senza andare
// a richiamare la prima api ogni volta verra' poi trasformato in array pulito solo con i dati che ci servono
// perche' l'oggetto iniziale presenta tante altre informazioni come risposta
let arrow_dx = "\u{02192}";
let arrox_sx = "\u{2190}";

function createUrl(index) {
  let NewUrl = `${API_ONE_NEWS + index + ".json"}`; // creo la url di richiesta alla seconda API
  return NewUrl; // No promise - normal function - restituisce solo la stringa url che mi serve per interrogare l'api di dettaglio per ogni news
}

function getOneNews(index) {
  return axios.get(createUrl(index)); // promise da gestire o con "then" OPPURE con async function e await
}

function getData() {
  return axios.get(API_500_NEWS); // promise da gestire o con "then" OPPURE con async function e await
}

async function getXnewsPerPage(array_id_news) {
  /////
  const PageEl = createPageContainer(); // aggiungo il page-container per aggiungere tutte le nuove news in un unico blocco altrimenti apparivano una alla volta
  /////
  for (let i = actual_index; i < actual_index + news_per_page; i++) {
    let newsX = await getOneNews(array_id_news[i]); // chiamata alla seconda API per i dettagli di ogni news
    let newsTitle = _.get(newsX, "data.title"); // utilizzo lodash per estrarre con semplicita' il dato che mi interessa dall'oggetto che arriva in risposta dalla 2 api che chiamiamo con i dettagli della news
    let newsLink = _.get(newsX, "data.url");

    let newsEpochTime = _.get(newsX, "data.time"); // epoch time to convert in Human format
    let newsAuthor = _.get(newsX, "data.by"); // estraggo anche l'autore della news
    let newsHumanTime = convertTime(newsEpochTime); // richiamo mia funzione esterna per convertire epoch time in human time
    createOneNewsEl(newsTitle, newsLink, newsHumanTime, newsAuthor, PageEl); //(newsTitle, newsLink, newsHumanTime, newsAuthor)
  }

  const coreDiv = document.getElementById("core-div"); // seleziono il div centrale dove appendere la pagina appena creata con le X (10 di default) news appena scaricate con tutti i dettagli

  coreDiv.appendChild(PageEl); // appendo la "pagina" creata -

  actual_index = news_per_page + actual_index; // aumento l'indice di partenza da cui prendere le eventuali prox news richieste

  const spinner = document.getElementById("spinner-container"); // seleziono lo spinner di caricamento
  spinner.style.display = "none"; //tolgo lo spinner di caricamento
  //document.getElementById("load-more").style.display = "block"; //rimetto il  bottone load more
  document.getElementById("load-more").innerHTML =
    arrow_dx + " MORE NEWS " + arrox_sx;
}

async function main_section() {
  obj500 = await getData(); // qui ho il mio oggetto con l'array di 500 news pronto!
  let array500 = obj500.data; // prendo dell'oggetto solo i dati che mi interessano quindi l'array

  getXnewsPerPage(array500); // richiamo la funzione che mi dara' i dettagli delle x(10) news e le visualizzera'
  // gli passo l'array generato dalla prima chiamata

  const buttonEl = document.getElementById("load-more"); // seleziono il bottone load-more per poi mettergli il listener

  buttonEl.addEventListener("click", function (event) {
    // funzione quando clicco il bottone load-more
    document.getElementById("load-more").innerHTML = "LOADING ...";
    const spinner = document.getElementById("spinner-container"); // seleziono lo spinner
    spinner.style.display = "block"; // faccio comparire lo spinner a schermo
    //document.getElementById("load-more").style.display = "none"; // tolgo il bottone "load more" finche' non ho scaricato e visualizzato le 10(x) news attuali
    getXnewsPerPage(array500); // chiamo la funzione principale passandogli l'array gia' costruito in precedenza con la lista degli id delle news
    //window.scrollTo(0, document.body.scrollHeight); // scroll till the end page
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setGenPageLayout();
  main_section();
});
