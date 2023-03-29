const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


let apiQuote = [];

// New Quote
function newQuote() {
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
}


// Get Quotes From API
async function getQuotes() {
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


// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/compose/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(twitterUrl, '_blank');
}


// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);



// On Load
getQuotes();