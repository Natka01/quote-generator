const container = document.getElementById('quote-container');
const quoteText = document.querySelector('.text');
const author = document.querySelector('.author');
const btnTwitter = document.querySelector('.twitter');
const btnNewQuote = document.querySelector('.new-quote');
const loader = document.querySelector('.loader');

let apiQuotes = [];

// Loading Spinner
function showLoadingSpinner() {    
    loader.hidden = false;
    container.hidden = true;   
}

function hideLoadingSpinner() {
    container.hidden = false;
    loader.hidden = true;    
}

// Show a New Quote
function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author is known    
    if (!quote.author) {
        author.textContent = 'Unknown';
    } else {
    author.textContent = quote.author;
    }
    // Set Quote Text
    quoteText.textContent = quote.text;

    hideLoadingSpinner();
}

// Get Quote from API 
async function getQuotes() { 
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();		    
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
btnNewQuote.addEventListener('click', newQuote);
btnTwitter.addEventListener('click', tweetQuote);

// On Load
getQuotes();


