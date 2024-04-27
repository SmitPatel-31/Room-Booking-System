import React, { useState, useEffect } from "react";
import Search from "./Components/Search";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import CardComponent from "./Components/Card";
import BookComponent from "./Components/Book"; // Make sure the import matches the name and location of your component file
const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const handleCardClick = (room) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    // Call handleSearch with an empty query on component mount
    handleSearch("");
    const storedDeviceId = localStorage.getItem("deviceId");
    if (storedDeviceId) {
      setDeviceId(storedDeviceId);
    } else {
      const newDeviceId = uuidv4();
      localStorage.setItem("deviceId", newDeviceId);
      setDeviceId(newDeviceId);
    }
  }, []);

  const handleSearch = async (query) => {
    try {
      const url =
        query.trim() === ""
          ? `http://127.0.0.1:8000/allrooms/`
          : `http://127.0.0.1:8000/searchrooms?q=${query}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div>
        <Search onSearch={handleSearch} />
      </div>
      <div className="card-container">
        {searchResults.map((room, index) => (
          <CardComponent
            data={room}
            key={index}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {dialogOpen && (
        <BookComponent
          room={selectedRoom}
          open={dialogOpen}
          onClose={handleCloseDialog}
          uid={deviceId}
        />
      )}
    </div>
  );
};

export default App;
