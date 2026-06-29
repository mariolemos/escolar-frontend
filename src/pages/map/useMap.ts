import { useToast } from "@/components/Toast";
import { apiGet } from "@/services/api";
import { useEffect, useState, useRef } from "react";

export interface ILocationResponse {
    vehicleId: number;
    latitude: number;
    longitude: number;
}

export const useMap = () => {

    const [position, setPosition] = useState<[number, number]>([-12.5816, -38.383039]);
    const [error, setError] = useState<boolean>(false);
    const errorRef = useRef<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        buscarLocalizacao();
        const intervalId = window.setInterval(() => {
            console.log('[useMap] intervalo: invocando buscarLocalizacao');
            if (!errorRef.current) {
                buscarLocalizacao();
            }
        }, 2000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // keep ref in sync with state so interval callback sees latest value
    useEffect(() => {
        errorRef.current = error;
    }, [error]);

    const buscarLocalizacao = async () => {
        console.log('[useMap] buscarLocalizacao chamado');
        try {
            const vehicleId = '03993940-239a-4233-a67b-132ecf98861d';
            const result = await apiGet<ILocationResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/location/${vehicleId}`);
            if (!result.success) {
                // backend returned structured error
                setPosition([-12.5816, -38.383039]);
                setError(true);
                errorRef.current = true;
                toast.showToast(result.message || 'Erro ao buscar localização', 'error');
                console.error('Erro na resposta da API:', result);
                return;
            }
            const response = result.data;
            console.log('[useMap] resposta recebida:', response);
            setPosition([response.latitude, response.longitude]);
            // sucesso: limpar erro
            if (error) {
                setError(false);
                errorRef.current = false;
            }
        } catch (error: Error | any) {
            setPosition([-12.5816, -38.383039]);
            setError(true);
            errorRef.current = true;
            const backendMessage = error?.body?.message || error?.message || 'Erro ao buscar localização';
            toast.showToast(backendMessage, "error");
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