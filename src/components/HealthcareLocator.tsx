import { useState, useEffect } from 'react';
import axios from 'axios';
import { loadGoogleMapsScript } from '../api/googleMapService';

/// <reference types="google.maps" />

const HealthcareLocator = () => {
  const [zipCode, setZipCode] = useState('');
  const [facilities, setFacilities] = useState<any[]>([]);
  
  // @ts-ignore
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
  loadGoogleMapsScript(() => {
    console.log('Google Maps script loaded');
  });
}, []);

  const getHealthcareFacilities = async () => {
    if (!zipCode) {
      alert('Please enter a ZIP code.');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/nearby-healthcare`, {
        params: { zipCode },
      });

      setFacilities(response.data);
      console.log(response.data)

      // Initialize Google Map
      const firstLocation = response.data[0].geometry.location;
      const mapInstance = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 12,
        center: { lat: firstLocation.lat, lng: firstLocation.lng },
      });

      setMap(mapInstance);

      // Add markers
      response.data.forEach((place: any) => {
        new google.maps.Marker({
          position: place.geometry.location,
          map: mapInstance,
          title: place.name,
        });
      });
    } catch (error) {
      console.error('Error fetching healthcare facilities:', error);
      alert('Failed to fetch healthcare facilities.');
    }
  };

  return (
    <div className='healthcare-locator'>
      <h3>Find Nearby Healthcare Facilities</h3>
      <input
        type="text"
        placeholder="Enter ZIP code or e.g. Seattle, WA"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <button onClick={getHealthcareFacilities} className='blue-btn'>
        Search
      </button>

      <div id="map" style={{ display: facilities.length > 0 ? 'block' : 'none' }}></div>

      <ul>
        {facilities.map((place, index) => (
          <li key={index}>
            {place.name} - {place.vicinity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthcareLocator;