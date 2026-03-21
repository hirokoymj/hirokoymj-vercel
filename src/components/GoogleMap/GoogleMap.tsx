import React from 'react';
import GoogleMapReact from 'google-map-react';

interface GoogleMapProps {
  lat: number;
  lng: number;
  children: React.ReactNode;
}

const LOS_ANGELES = {
  city: 'los angeles',
  lat: 34.052,
  lon: -118.244,
  unit: 'imperial',
};

export const GoogleMap: React.FC<GoogleMapProps> = ({ lat = LOS_ANGELES.lat, lng = LOS_ANGELES.lon, children }) => {
  const googleKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: googleKey,
      }}
      defaultCenter={{ lat, lng }}
      defaultZoom={10}
      center={{ lat, lng }}
      zoom={10}
    >
      {children}
    </GoogleMapReact>
  );
};
