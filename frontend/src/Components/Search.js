import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Search as SearchIcon } from '@mui/icons-material';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    
      onSearch(value);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
      onSearch(query);
    
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <TextField
        value={query}
        style={{ width: '400px', paddingInline: '12px', height: 'fit-content' }}
        onChange={handleChange}
        variant="outlined"
        placeholder="Search..."
        InputProps={{
          endAdornment: (
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </form>
  );
};

export default Search;
