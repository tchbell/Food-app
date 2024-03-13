import { GooglePlace } from "../types/GooglePlace";

const fetchPlaceData = async (latitude: number, longitude: number): Promise<{ places: GooglePlace[], nextPageToken: string }> => {
    try {
        const reponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=restaurant&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
        );
        if (!reponse.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await reponse.json();
        return {
            places: data.results,
            nextPageToken: data.next_page_token
        };
    } catch (error) {
        console.error('Error fetching place data:', error);
        throw error;
    }
};

const fetchMorePlaceData = async (nextPageToken: string) => {
    try {
        const reponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
        );
        if (!reponse.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await reponse.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching place data:', error);
        throw error;
    }
};

const geocodeZipCode = async (zipCode: string): Promise<{ latitude: number, longitude: number }> => {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to geocode zip code');
        }
        const data = await response.json();
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
    } catch (error) {
        console.error('Error geocoding zip code:', error);
        throw error;
    }
};

export { fetchMorePlaceData, fetchPlaceData, geocodeZipCode };