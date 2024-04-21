import React, { useState, useEffect } from 'react';
import Search from './Components/Search';
import './App.css';

import CardComponent from './Components/Card'; 
import BookComponent from './Components/Book';// Make sure the import matches the name and location of your component file
const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCardClick = (room) => {
    setSelectedRoom(room);
    console.log(room);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    // Call handleSearch with an empty query on component mount
    handleSearch('');
  }, []);

  const handleSearch = async (query) => {
    try {
      const url = query.trim() === '' ? `http://127.0.0.1:8000/allrooms/` : `http://127.0.0.1:8000/searchrooms?q=${query}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div>
        <Search onSearch={handleSearch} />

      </div>
      <div className="card-container">
        {searchResults.map((room, index) => (
        <CardComponent data={room} key={index} onCardClick={handleCardClick}/>
      ))}
      </div>

      {dialogOpen && (
        <BookComponent room={selectedRoom} open={dialogOpen} onClose={handleCloseDialog} />
      )}
    </div>

  );
};

export default App;
