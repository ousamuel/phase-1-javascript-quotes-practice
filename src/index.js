let currentQuote;
fetch(`http://localhost:3000/quotes`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((quote) => loadQuotes(quote));
  });
const form = document.getElementById("new-quote-form");
const quoteList = document.getElementById("quote-list");

function loadQuotes(quote) {
  const quoteCard = document.createElement("li");
  const blockQuote = document.createElement("blockquote");
  const realQuote = document.createElement("p");
  const footer = document.createElement("footer");
  const br = document.createElement("br");
  const sBtn = document.createElement("button");
  const span = document.createElement("span");
  const dBtn = document.createElement("button");
  quoteCard.className = "quote-card";
  blockQuote.className = "blockquote";
  realQuote.className = "mb-0";
  realQuote.textContent = quote.quote;
  footer.textContent = quote.author;
  sBtn.textContent = "Likes: ";
  span.textContent = 0;
  sBtn.addEventListener('click', () => {
    currentQuote = quote;
    span.textContent = (parseInt(span.textContent) + 1)
    likePostRequest();
  })

  dBtn.textContent = "Delete";
  dBtn.addEventListener("click", () => {
    quoteCard.remove();
    //can add DELETE request here to remove from backend
  });

  sBtn.append(span);
  blockQuote.append(realQuote, footer, br, sBtn, dBtn);
  quoteCard.append(blockQuote);
  quoteList.append(quoteCard);
}

const newQuote = document.getElementById("new-quote");
const newAuthor = document.getElementById("author");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newQuoteData = {
    id: currentQuote.id + 1,
    quote: newQuote.value,
    author: newAuthor.value,
  };
  loadQuotes(newQuoteData);
  Request(newQuoteData);
  //POST request will add quote to backend
});

function quotePostRequest(quoteData) {
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(quoteData),
  };

  fetch(`http://localhost:3000/quotes`, configObject)
    .then((res) => res.json())
    .then();
}

function likePostRequest(){
  console.log('test')
  const newLikeData = {
    quoteId: currentQuote.id
  }
  const configObject ={
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newLikeData)
  }
  fetch(`http://localhost:3000/likes`, configObject)
    .then(res=> res.json())
}
