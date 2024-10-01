import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
      setQuotes(response.data.quotes); // Lưu trữ tất cả các trích dẫn
      getRandomQuote(response.data.quotes); // Lấy trích dẫn ngẫu nhiên
    } catch (error) {
      console.error("Error fetching quotes", error);
    }
  };

  const getRandomQuote = (quotesArray) => {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    setQuote(quotesArray[randomIndex].quote);
    setAuthor(quotesArray[randomIndex].author);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleNewQuote = () => {
    getRandomQuote(quotes);
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div id="quote-box" className="quote-box">
      <h1 id="text">{quote}</h1>
      <h3 id="author">- {author}</h3>
      <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
      <a id="tweet-quote" onClick={tweetQuote}>Tweet Quote</a>
    </div>
  );
};

export default App;
