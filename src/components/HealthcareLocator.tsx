import { useState, useEffect } from 'react';
import axios from 'axios';
import { loadGoogleMapsScript } from '../api/googleMapService';

/// <reference types="google.maps" />

const HealthcareLocator = () => {
  const [zipCode, setZipCode] = useState('');
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // @ts-ignore
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
  loadGoogleMapsScript(() => {
    console.log('Google Maps script loaded');
  });
}, []);

  const getHealthcareFacilities = async () => {
  if (!zipCode) {
    alert('Please enter a ZIP code or a city and state, e.g., Seattle, WA.');
    return;
  }
  setLoading(true);
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/nearby-healthcare`, {
      params: { zipCode },
    });

    const filteredFacilities = response.data.filter((place: any) => place.business_status === 'OPERATIONAL' && place.rating > 0);

    setFacilities(filteredFacilities);

    // Initialize Google Map
    const firstLocation = filteredFacilities[0]?.geometry?.location;
    if (firstLocation) {
      const mapInstance = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 12,
        center: { lat: firstLocation.lat, lng: firstLocation.lng },
      });

      setMap(mapInstance);

      // Add markers
      filteredFacilities.forEach((place: any) => {
        new google.maps.Marker({
          position: place.geometry.location,
          map: mapInstance,
          title: place.name,
        });
      });
    }
  } catch (error) {
    console.error('Error fetching healthcare facilities:', error);
    alert('Failed to fetch healthcare facilities.');
  } finally {
    setLoading(false);
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
        className='zip-code-input'
      />
      <button onClick={getHealthcareFacilities} className='blue-btn'>
        Search
      </button>

      {loading && <div className="loader"></div>}
      
      <div id="map" style={{ display: facilities.length > 0 ? 'block' : 'none' }}></div>

      <ul>
        {facilities.map((place, index) => (
          <li key={index}>
            {place.name} - {place.vicinity} - rating: <span>{place.rating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthcareLocator;