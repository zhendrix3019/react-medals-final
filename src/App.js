import React, { useState } from 'react';
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import { Toast, ToastContainer } from 'react-bootstrap'; // Import Toast
import './App.css'; // Import the CSS file

function App() {
  const [countries, setCountries] = useState([
    { id: 1, name: 'United States', gold: 2, silver: 1, bronze: 1 },
    { id: 2, name: 'China', gold: 3, silver: 2, bronze: 0 },
    { id: 3, name: 'Germany', gold: 0, silver: 1, bronze: 2 },
  ]);

  const [showToast, setShowToast] = useState(false); // State to control toast visibility

  const addCountry = (name) => {
    if (name.trim() === '') {
      setShowToast(true); // Show the toast if no valid name is entered
      return;
    }

    const newCountry = {
      id: countries.length + 1,
      name: name,
      gold: 0,
      silver: 0,
      bronze: 0,
    };
    setCountries([...countries, newCountry]);
  };

  const deleteCountry = (id) => {
    setCountries(countries.filter(country => country.id !== id));
  };

  return (
    <div className="App">
      <NewCountry onAddCountry={addCountry} /> {/* Passing the function as a prop */}
      
      {countries.map(country => (
        <Country 
          key={country.id}
          {...country}
          onDelete={() => deleteCountry(country.id)}
        />
      ))}

      {/* Toast Container */}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Validation Error</strong>
          </Toast.Header>
          <Toast.Body>Please enter a valid country name!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
