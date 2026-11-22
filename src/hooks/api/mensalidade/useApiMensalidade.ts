import { ApiResult, apiGet, apiPost, apiPut, apiDelete } from '@/services/api';
import { useToast } from '@/components/Toast';
import { Contato } from '@/layout/componets/ContatosForm';
import { Endereco } from '@/layout/componets/EnderecoForm/useEnderecoForm';

const base = 'mensalidades';

export interface IMensalidadeResponse {
    id: number;
    alunos: string;
    formaPagamento: string;    
    valorMensal: number;   
    situacao: string;
    responsavelId: string;
    colegioId: string;
    ativo: boolean;
    vencimento: string;
    mes: string;
    
}

export interface IMensalidadeRequest {
    alunos: string;
    formaPagamento: string;    
    valorMensal: number;   
    situacao: string;
    responsavelId: string;
    colegioId: string;
    ativo: boolean ;
    vencimento?: string; 
    mes: string;  
}

export const useApiMensalidade = () => {
    const { showToast } = useToast();

    const handleErrorToast = (res: ApiResult<any>) => {
        if (!res) return showToast('Erro desconhecido', 'error');
        if (!res.success) {
            const msg = res.message || (res.body && (res.body.message || res.body.error)) || `Erro: ${res.status}`;
            showToast(msg, 'error');
        }
    };

    const list = async (): Promise<ApiResult<IMensalidadeResponse[]>> => {
        const res = await apiGet<IMensalidadeResponse[]>(`${base}`);
        if (!res.success) handleErrorToast(res);
        return res;
    };

    const getById = async (id: string): Promise<ApiResult<IMensalidadeResponse>> => {
        const res = await apiGet<IMensalidadeResponse>(`${base}/${id}`);
        if (!res.success) handleErrorToast(res);
        return res;
    };

    const create = async (payload: IMensalidadeRequest): Promise<ApiResult<IMensalidadeResponse>> => {
        const res = await apiPost<IMensalidadeResponse>(`${base}`, payload);
        if (res.success) showToast('Mensalidade criado com sucesso', 'success');
        else handleErrorToast(res);
        return res;
    };

    const update = async (id: string, payload: IMensalidadeRequest): Promise<ApiResult<IMensalidadeResponse>> => {
        const res = await apiPut<IMensalidadeResponse>(`${base}/${id}`, payload);
        if (res.success) showToast('Mensalidade atualizado com sucesso', 'success');
        else handleErrorToast(res);
        return res;
    };

    const remove = async (id: string): Promise<ApiResult<IMensalidadeResponse>> => {
        const res = await apiDelete<IMensalidadeResponse>(`${base}/${id}`);
        if (res.success) showToast('Mensalidade removido com sucesso', 'success');
        else handleErrorToast(res);
        return res;
    };

    return { list, getById, create, update, remove };
};

export default useApiMensalidade;
