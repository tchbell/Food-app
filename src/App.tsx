import React, { FormEvent, useEffect, useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { loadPlacesScript } from './utils/loadPlaceScript';
import { GooglePlace } from './types/GooglePlace';
import {
  fetchMorePlaceData,
  fetchPlaceData,
  geocodeZipCode,
} from './utils/dataService';

function App() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [places, setPlaces] = useState<GooglePlace[]>([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<GooglePlace | null>(null);
  const [zipCode, setZipCode] = useState<string | ''>('');

  loadPlacesScript();

  const loadMorePlaces = async () => {
    try {
      const morePlaces = await fetchMorePlaceData(nextPageToken);
      setPlaces((prevPlaces) => [...prevPlaces, ...morePlaces]);
    } catch {
      console.error('Error fetching more place data');
    }
  };

  const loadInitialPlaces = async (latitude: number, longitude: number) => {
    try {
      const data = await fetchPlaceData(latitude, longitude);
      setPlaces(data.places);
      setNextPageToken(data.nextPageToken);
    } catch {
      console.error('Error fetching place data');
    }
  };

  const placesByZip = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    geocodeZipCode(zipCode).then(({ latitude, longitude }) => {
      console.log('latitude:', latitude, 'longitude:', longitude);
      loadInitialPlaces(latitude, longitude);
    });
  };

  const selectRandomPlace = () => {
    const random = Math.floor(Math.random() * places.length);
    setSelectedPlace(places[random]);
  };

  const onZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      loadInitialPlaces(latitude, longitude);
    });

    loadPlacesScript();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col">
            {' '}
            <h1>FOOD APP</h1>
            <form onSubmit={placesByZip}>
              {' '}
              <input
                type="number"
                name="zipcode"
                value={zipCode}
                onChange={onZipChange}
                placeholder="Enter Zip"
              />
              <button type="submit" disabled={!zipCode}>
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col"> {/* <h2>{foodContext.restaurant}</h2> */}</div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            {' '}
            <button onClick={() => loadMorePlaces()}>More Places</button>
            <button onClick={selectRandomPlace}>Select Random Place</button>
            {selectedPlace && selectedPlace.name}
          </div>
          <div className="col-12 col-md-6 col-lg-8">
            {' '}
            <h3>Options</h3>
            <ul>
              {places.map((place: any, index: number) => (
                <li key={index}>{place.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
