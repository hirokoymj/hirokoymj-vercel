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

export const GoogleMap = ({ lat = LOS_ANGELES.lat, lng = LOS_ANGELES.lon, children }: GoogleMapProps) => {
  const googleKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
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
