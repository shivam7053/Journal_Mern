import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Custom.css"

const SearchResults = () => {
  const { searchType, searchQuery } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`https://journal-mern-oefu.onrender.com/api/search`, {
          params: {
            type: searchType,
            query: searchQuery,
          },
        });
        setResults(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchResults();
  }, [searchType, searchQuery]);

  return (
    <div className="BG-photo d-flex flex-column justify-content-center">
      <h2>Search Results for "{searchQuery}" by {searchType}</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
