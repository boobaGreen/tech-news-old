const body = document.body;

// Function for create general elements
export function createGeneralDiv(tagHtml, className) {
  const newElement = document.createElement(tagHtml);
  newElement.classList.add(className);
  newElement.setAttribute("id", className);
  body.appendChild(newElement);
}

export function createFirstLevel(tagHtml, className, content) {
  const newElement = document.createElement(tagHtml);
  newElement.classList.add(className);
  newElement.innerHTML = content;
  newElement.setAttribute("id", className);
  const mainDiv = document.getElementById("main-div");
  mainDiv.appendChild(newElement);
}
//////////////////////////////////////////
export function createPageContainer() {
  const actualPageContainer = document.createElement("div");
  actualPageContainer.classList.add("actual-page");
  return actualPageContainer;
}
//////////////////////////////////////////
export function createOneNewsEl(
  newsTitle,
  newsLink,
  newsHumanTime,
  newsAuthor,
  PageEl
) {
  // DIV FOR 1 NEWS CREATE
  const newElement = document.createElement("div");
  newElement.classList.add("one-news-div");

  // SECTION FOR 1 NEWS TITLE-CREATE
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container"); // vedere se serve questa classe altrimenti toglierla

  const newsTitleEl = document.createElement("h1");
  newsTitleEl.classList.add("news-title"); // vedere se serve questa classe altrimenti toglierla
  newsTitleEl.innerHTML = newsTitle;

  titleContainer.appendChild(newsTitleEl);
  newElement.appendChild(titleContainer);
  /////////////////////////////////////////////////////////////////////
  // DIV CONTAINER FOR DETAILS
  const newsDetailEl = document.createElement("div");
  newsDetailEl.classList.add("detail-div");
  newElement.appendChild(newsDetailEl);
  ////////////////////////////////////////////////////////////////////
  // SECTION FOR LINK

  const divDet1El = document.createElement("div");

  const newsLinkEl = document.createElement("a");
  newsLinkEl.id = "url-value";
  newsLinkEl.href = newsLink;
  newsLinkEl.target = "blank";
  if (!newsLink) {
    const pNewsForNotLinked = document.createElement("p");
    pNewsForNotLinked.innerHTML = "No links available";
    divDet1El.appendChild(pNewsForNotLinked);
  } else {
    newsLinkEl.innerHTML = "LINK";
    divDet1El.appendChild(newsLinkEl);
  }

  // SECTION FOR TIME

  const divDet2El = document.createElement("div");

  const newsTimeEl = document.createElement("p");
  newsTimeEl.classList.add("news-time");
  newsTimeEl.innerHTML = newsHumanTime;
  divDet2El.appendChild(newsTimeEl);

  // SECTION FOR AUTHOR

  const divDet3El = document.createElement("div");

  const newsAuthEl = document.createElement("p");
  newsAuthEl.classList.add("news-author");
  newsAuthEl.innerHTML = "By : " + newsAuthor;
  divDet3El.appendChild(newsAuthEl);

  /////////////////////////////////////////

  newsDetailEl.appendChild(divDet1El);
  newsDetailEl.appendChild(divDet2El);
  newsDetailEl.appendChild(divDet3El);

  ////////////////////////////////
  PageEl.appendChild(newElement);
}
