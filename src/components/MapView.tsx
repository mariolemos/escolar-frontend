import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap as useLeafletMap } from 'react-leaflet';
import L from 'leaflet';

interface IMapViewProps {
  position: [number, number];
}

export default function MapView({
  position,
} : IMapViewProps) {

  useEffect(() => {
    // Configure default icon URLs (use CDN to avoid bundler image issues)
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer center={position} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={position}>
        <Popup>Transporte Escolar</Popup>
      </Marker>
      <Recenter position={position} />
    </MapContainer>
  );
}

function Recenter({ position }: { position: [number, number] }) {
  const map = useLeafletMap();

  useEffect(() => {
    if (map && position) {
      map.setView(position);
    }
  }, [map, position]);

  return null;
}