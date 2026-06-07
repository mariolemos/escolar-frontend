import dynamic from 'next/dynamic';
import { useMap } from './useMap';

const MapView = dynamic(() => import('@/components/MapView'), {
    ssr: false,
    loading: () => <p>Carregando mapa...</p>,
});

export default function Map() {

    const {
        action: {
        },
        data: {
            position
        }
    } = useMap();

    return <MapView position={position} />;
}