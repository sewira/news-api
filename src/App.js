import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardNews } from "./components/CardNews";
import "./App.css";

function App() {
  const API_KEY = "a2839a230a174dd3b41cf68c6566d1c7";

  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const getNews = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=id&apiKey=${API_KEY}`
    );
    const data = await response.json();
    console.log(data.articles);
    setNews(data.articles);
  };

  const searchNews = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    setSearch(data.articles);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} />
        <button type="submit"> Cari Berita</button>
      </form>
      <h1>News API</h1>
      {news.map((news) => (
        <CardNews
          key={uuidv4()}
          title={news.title}
          image={news.urlToImage}
          description={news.description}
        />
      ))}
    </div>
  );
}

export default App;
