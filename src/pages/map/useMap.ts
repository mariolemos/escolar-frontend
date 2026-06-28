import { apiGet } from "@/services/api";
import { useEffect, useState } from "react";

export interface ILocationResponse {
    vehicleId: number;
    latitude: number;
    longitude: number;
}

export const useMap = () => {

    const [position, setPosition] = useState<[number, number]>([-12.9207898, -38.4021139]);

    useEffect(() => {
        buscarLocalizacao();
    }, []);

    const buscarLocalizacao = async () => {
        try {
            const vehicleId = '03993940-239a-4233-a67b-132ecf98861d';
            const responste = await apiGet<ILocationResponse>(`http://localhost:8081/api/location/${vehicleId}`);
            setPosition([responste.latitude, responste.longitude]);
        } catch (error) {
            console.error("Erro ao buscar localização:", error);
        }

    }

    return {
        action: {
        },
        data: {
            position
        }
    };
}