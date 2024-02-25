import React, { useContext } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Dining from './components/Dining';
import { FoodContext } from './context/FoodContextProvider';
import Cuisine from './components/Cuisine';

function App() {
  const foodContext = useContext(FoodContext);
  // Check if foodContext is undefined
  if (!foodContext) {
    return <div>Loading...</div>; // or some other fallback UI
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col">
            {' '}
            <h1>FOOD APP</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {' '}
            <h2>{foodContext.restaurant}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            {' '}
            <Dining />
            <Cuisine />
            <button onClick={foodContext.pickRestaurant}>
              Pick Place To Eat
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-8">
            {' '}
            <h3>Options</h3>
            <ul>
              {foodContext
                .filterRestaurants(
                  foodContext.selectedDiningStyle,
                  foodContext.selectedCuisineType
                )
                .map((restaurant, index) => (
                  <li key={index}>{restaurant.name}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
