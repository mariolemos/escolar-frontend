import { ApiResult, apiGet, apiPost, apiPut, apiDelete } from '@/services/api';
import { useToast } from '@/components/Toast';

const base = 'contrato';

export interface IContratoResponse {
  id?: number;
  valorContratual: number;
  dataInicial?: string;
  dataFinal?: string;
  responsavelId: string;
  ativo: boolean;
  valorMensal: number;
}

export interface IContratoRequest {
  valorContratual: number;
  dataInicial?: string | Date;
  dataFinal?: string | Date;
  responsavelId: string;
  ativo: boolean;
}

export const useApiContrato = () => {
  const { showToast } = useToast();

  const handleErrorToast = (res: ApiResult<any>) => {
    if (!res) return showToast('Erro desconhecido', 'error');
    if (!res.success) {
      const msg = res.message || (res.body && (res.body.message || res.body.error)) || `Erro: ${res.status}`;
      showToast(msg, 'error');
    }
  };

  const list = async (): Promise<ApiResult<IContratoResponse[]>> => {
    const res = await apiGet<IContratoResponse[]>(`${base}`);
    if (!res.success) handleErrorToast(res);
    return res;
  };

  const getById = async (id: string): Promise<ApiResult<IContratoResponse>> => {
    const res = await apiGet<IContratoResponse>(`${base}/${id}`);
    if (!res.success) handleErrorToast(res);
    return res;
  };

  const create = async (payload: IContratoRequest): Promise<ApiResult<IContratoResponse>> => {
    const res = await apiPost<IContratoResponse>(`${base}`, payload);
    if (res.success) showToast('Contrato criado com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  const update = async (id: string, payload: IContratoRequest): Promise<ApiResult<IContratoResponse>> => {
    const res = await apiPut<IContratoResponse>(`${base}/${id}`, payload);
    if (res.success) showToast('Contrato atualizado com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  const remove = async (id: string): Promise<ApiResult<IContratoResponse>> => {
    const res = await apiDelete<IContratoResponse>(`${base}/${id}`);
    if (res.success) showToast('Contrato removido com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  return { list, getById, create, update, remove };
};

export default useApiContrato;
