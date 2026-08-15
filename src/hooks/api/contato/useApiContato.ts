import { ApiResult, apiGet, apiPost, apiPut, apiDelete } from '@/services/api';
import { useToast } from '@/components/Toast';

const base = 'contato';

export interface IContatoResponse {
  id?: number;
  tipo: string;
  contato: string;
}

export interface IContatoRequest {
  tipo: string;
  contato: string;
}

export const useApiContato = () => {
  const { showToast } = useToast();

  const handleErrorToast = (res: ApiResult<any>) => {
    if (!res) return showToast('Erro desconhecido', 'error');
    if (!res.success) {
      const msg = res.message || (res.body && (res.body.message || res.body.error)) || `Erro: ${res.status}`;
      showToast(msg, 'error');
    }
  };

  const list = async (): Promise<ApiResult<IContatoResponse[]>> => {
    const res = await apiGet<IContatoResponse[]>(`${base}`);
    if (!res.success) handleErrorToast(res);
    return res;
  };

  const getById = async (id: string): Promise<ApiResult<IContatoResponse>> => {
    const res = await apiGet<IContatoResponse>(`${base}/${id}`);
    if (!res.success) handleErrorToast(res);
    return res;
  };

  const create = async (payload: IContatoRequest): Promise<ApiResult<IContatoResponse>> => {
    const res = await apiPost<IContatoResponse>(`${base}`, payload);
    if (res.success) showToast('Contato criado com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  const update = async (id: string, payload: IContatoRequest): Promise<ApiResult<IContatoResponse>> => {
    const res = await apiPut<IContatoResponse>(`${base}/${id}`, payload);
    if (res.success) showToast('Contato atualizado com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  const remove = async (id: string): Promise<ApiResult<IContatoResponse>> => {
    const res = await apiDelete<IContatoResponse>(`${base}/${id}`);
    if (res.success) showToast('Contato removido com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  return { list, getById, create, update, remove };
};

export default useApiContato;
