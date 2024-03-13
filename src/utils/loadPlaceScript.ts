const loadPlacesScript = () => {
    let googleScript = document.getElementById('googleMaps');
    if (!googleScript) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://places.googleapis.com/v1/places/GyuEmsRBfy61i59si0?fields=addressComponents&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
        script.id = 'googleMaps';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }
};
export { loadPlacesScript };