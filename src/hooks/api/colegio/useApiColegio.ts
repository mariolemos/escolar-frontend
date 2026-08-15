import { ApiResult, apiGet, apiPost, apiPut, apiDelete } from '@/services/api';
import { useToast } from '@/components/Toast';
import { Contato } from '@/layout/componets/ContatosForm';

const base = 'colegio';

export interface IColegioResponse {
    id: number;
    nome: string;
    horario: string;
    ativo: boolean;
    contatos: Array<Contato>;
}

export interface IColegioRequest {
    horario: string;
    nome: string;
    endereco: {
        cep: string;
        logradouro: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        complemento?: string | undefined;
    };
    contatos: {
        tipo: string;
        contato: string;
    }[];
}


export const useApiColegio = () => {
    const { showToast } = useToast();

    const handleErrorToast = (res: ApiResult<any>) => {
        if (!res) return showToast('Erro desconhecido', 'error');
        if (!res.success) {
            const msg = res.message || (res.body && (res.body.message || res.body.error)) || `Erro: ${res.status}`;
            showToast(msg, 'error');
        }
    };

    const list = async (): Promise<ApiResult<IColegioResponse[]>> => {
        const res = await apiGet<IColegioResponse[]>(`${base}`);
        if (!res.success) handleErrorToast(res);
        return res;
    };

    const getById = async (id: string): Promise<ApiResult<IColegioResponse>> => {
        const res = await apiGet<IColegioResponse>(`${base}/${id}`);
        if (!res.success) handleErrorToast(res);
        return res;
    };

    const create = async (payload: IColegioRequest): Promise<ApiResult<IColegioResponse>> => {
        const res = await apiPost<IColegioResponse>(`${base}`, payload);
        if (res.success) showToast('Colégio criado com sucesso', 'success');
        else handleErrorToast(res);
        return res;
    };

    const update = async (id: string, payload: IColegioRequest): Promise<ApiResult<IColegioResponse>> => {
        const res = await apiPut<IColegioResponse>(`${base}/${id}`, payload);
        if (res.success) showToast('Colégio atualizado com sucesso', 'success');
        else handleErrorToast(res);
        return res;
    };

    const remove = async (id: string): Promise<ApiResult<IColegioResponse>> => {
        const res = await apiDelete<IColegioResponse>(`${base}/${id}`);
        if (res.success) showToast('Colégio removido com sucesso', 'success');
        else handleErrorToast(res);
        return res;
    };

    return { list, getById, create, update, remove };
};

export default useApiColegio;
