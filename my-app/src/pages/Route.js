import React, { useEffect, useState } from 'react';

function Route() {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    // Initialize the map script dynamically when the component mounts
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBJGka0c_Jtlz1zjPCuElsiv1jsP_IvZKY&libraries=places&callback=initMap`;
    script.async = true;
    window.initMap = initMap; // Set the callback function for the map API
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    // Initialize the map
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 13.0827, lng: 80.2707 }, // Example coordinates for Chennai
      zoom: 13,
    });
    setMap(mapInstance);

    // Initialize DirectionsService and DirectionsRenderer
    const directionsServiceInstance = new window.google.maps.DirectionsService();
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
      map: mapInstance,
    });
    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);

    // Set up Autocomplete for origin and destination inputs
    const originInput = document.getElementById('pac-input');
    const destinationInput = document.getElementById('destination-input');
    const autocompleteOrigin = new window.google.maps.places.Autocomplete(originInput);
    const autocompleteDestination = new window.google.maps.places.Autocomplete(destinationInput);

    autocompleteOrigin.bindTo('bounds', mapInstance);
    autocompleteDestination.bindTo('bounds', mapInstance);
  };

  const calculateRoute = () => {
    const origin = document.getElementById('pac-input').value;
    const destination = document.getElementById('destination-input').value;

    if (!origin || !destination) {
      alert('Please enter both origin and destination.');
      return;
    }

    const request = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        const route = result.routes[0];
        const distance = route.legs[0].distance.value / 1000; // Distance in kilometers
        document.getElementById('total-distance').textContent = `Total Distance: ${distance.toFixed(2)} km`;

        // Example calculation for NH distance (75% of total distance)
        const nhDistance = distance * 0.75;
        document.getElementById('nh-distance').textContent = `NH Distance: ${nhDistance.toFixed(2)} km`;
      } else {
        alert('Could not calculate the route. Please try again.');
      }
    });
  };

  return (
    <div className="form-container">
      <h3>Calculate Route</h3>
      <input id="pac-input" type="text" placeholder="Enter origin" />
      <input id="destination-input" type="text" placeholder="Enter destination" />
      <button id="calculate-btn" onClick={calculateRoute}>
        Calculate Route
      </button>

      <div className="distance-container">
        <div id="total-distance" className="distance-label">Total Distance: N/A</div>
        <div id="nh-distance" className="distance-label">NH Distance: N/A</div>
      </div>

      <div id="map" style={{ height: '500px', width: '250%' }}></div>
    </div>
  );
}

export default Route;
