const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// New Quote
function newQuote() {
  loading();
  // pick random quotes from apiQuote
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  quoteText.textContent = quote.text;

  // check if author field is blank n replace with 'unkwown'
  if (!quote.author) {
    author.textContent = 'Unknown';
  } else {
    author.textContent = quote.author;
  }

  // check quote length
  if (quote.text.length > 30) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  complete();
}


// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json(response);
    newQuote();
  } catch (err) {
    // Catch Error Here
    console.error(err)
  }
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);

// On Load
getQuotes();