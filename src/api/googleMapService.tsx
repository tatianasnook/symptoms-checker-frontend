
export const loadGoogleMapsScript = (callback: () => void) => {
  const existingScript = document.getElementById('google-maps-script');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places`;
    script.id = 'google-maps-script';
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
};
