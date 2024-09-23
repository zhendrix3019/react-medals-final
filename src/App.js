import React, { useState, useEffect } from 'react';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

function App() {
  const [countries, setCountries] = useState([]);

  // Fetch the countries from the backend API
  useEffect(() => {
    fetch('https://localhost:7189/api/country')  
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  // Function to handle adding a new country
  const handleAddCountry = (countryName) => {
    const newCountry = {
      name: countryName,
      gold: 0,
      silver: 0,
      bronze: 0,
    };

    fetch('http://localhost:5104/api/country', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCountry),
    })
      .then(response => response.json())
      .then(addedCountry => {
        setCountries([...countries, addedCountry]);
      })
      .catch(error => console.error('Error adding country:', error));
  };

  // Function to handle deleting a country
  const handleDeleteCountry = (id) => {
    fetch(`http://localhost:5104/api/country/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCountries(countries.filter(country => country.id !== id));
      })
      .catch(error => console.error('Error deleting country:', error));
  };

  return (
    <div>
      <h1>Countries and Medals</h1>
      <NewCountry onAddCountry={handleAddCountry} />
      {countries.map(country => (
        <Country
          key={country.id}
          name={country.name}
          gold={country.gold}
          silver={country.silver}
          bronze={country.bronze}
          onDelete={() => handleDeleteCountry(country.id)}
        />
      ))}
    </div>
  );
}

export default App;
