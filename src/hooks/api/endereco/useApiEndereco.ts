import { ApiResult, apiGet, apiPost, apiPut, apiDelete } from '@/services/api';
import { useToast } from '@/components/Toast';
import { EnderecoSchema } from '@/schemas/enderecoSchema';

const base = 'endereco';

export interface IEnderecoResponse extends EnderecoSchema {
  id?: number;
}

export interface IEnderecoRequest extends EnderecoSchema {}

export const useApiEndereco = () => {
  const { showToast } = useToast();

  const handleErrorToast = (res: ApiResult<any>) => {
    if (!res) return showToast('Erro desconhecido', 'error');
    if (!res.success) {
      const msg = res.message || (res.body && (res.body.message || res.body.error)) || `Erro: ${res.status}`;
      showToast(msg, 'error');
    }
  };

  const list = async (): Promise<ApiResult<IEnderecoResponse[]>> => {
    const res = await apiGet<IEnderecoResponse[]>(`${base}`);
    if (!res.success) handleErrorToast(res);
    return res;
  };

  const getById = async (id: string): Promise<ApiResult<IEnderecoResponse>> => {
    const res = await apiGet<IEnderecoResponse>(`${base}/${id}`);
    if (!res.success) handleErrorToast(res);
    return res;
  };

  const create = async (payload: IEnderecoRequest): Promise<ApiResult<IEnderecoResponse>> => {
    const res = await apiPost<IEnderecoResponse>(`${base}`, payload);
    if (res.success) showToast('Endereço criado com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  const update = async (id: string, payload: IEnderecoRequest): Promise<ApiResult<IEnderecoResponse>> => {
    const res = await apiPut<IEnderecoResponse>(`${base}/${id}`, payload);
    if (res.success) showToast('Endereço atualizado com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  const remove = async (id: string): Promise<ApiResult<IEnderecoResponse>> => {
    const res = await apiDelete<IEnderecoResponse>(`${base}/${id}`);
    if (res.success) showToast('Endereço removido com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  return { list, getById, create, update, remove };
};

export default useApiEndereco;
