import { ApiResult, apiGet, apiPost, apiPut, apiDelete } from '@/services/api';
import { useToast } from '@/components/Toast';
import { EnderecoSchema } from '@/schemas/enderecoSchema';
import { ContatoSchema } from '@/schemas/contatoSchema';
import { Contato } from '@/layout/componets/ContatosForm';
import { Endereco } from '@/layout/componets/EnderecoForm/useEnderecoForm';

const base = 'responsavel';

export interface IResponsavelResponse {
  id: number;
  nome: string;
  dataNascimento?: string;
  cpf: string;
  rg: string;
  parentesco: string;
  endereco?: Endereco;
  contatos?: Contato[];
}

export interface IResponsavelRequest {
  nome: string;
  dataNascimento?: string | Date;
  cpf: string;
  rg: string;
  parentesco: string;
  endereco?: EnderecoSchema;
  contatos?: ContatoSchema[];
}

export const useApiResponsavel = () => {
  const { showToast } = useToast();

  const handleErrorToast = (res: ApiResult<any>) => {
    if (!res) return showToast('Erro desconhecido', 'error');
    if (!res.success) {
      const msg = res.message || (res.body && (res.body.message || res.body.error)) || `Erro: ${res.status}`;
      showToast(msg, 'error');
    }
  };

  const list = async (): Promise<ApiResult<IResponsavelResponse[]>> => {
    const res = await apiGet<IResponsavelResponse[]>(`${base}`);
    if (!res.success) handleErrorToast(res);
    return res;
  };

  const getById = async (id: string): Promise<ApiResult<IResponsavelResponse>> => {
    const res = await apiGet<IResponsavelResponse>(`${base}/${id}`);
    if (!res.success) handleErrorToast(res);
    return res;
  };

  const create = async (payload: IResponsavelRequest): Promise<ApiResult<IResponsavelResponse>> => {
    const res = await apiPost<IResponsavelResponse>(`${base}`, payload);
    if (res.success) showToast('Responsável criado com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  const update = async (id: string, payload: IResponsavelRequest): Promise<ApiResult<IResponsavelResponse>> => {
    const res = await apiPut<IResponsavelResponse>(`${base}/${id}`, payload);
    if (res.success) showToast('Responsável atualizado com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  const remove = async (id: string): Promise<ApiResult<IResponsavelResponse>> => {
    const res = await apiDelete<IResponsavelResponse>(`${base}/${id}`);
    if (res.success) showToast('Responsável removido com sucesso', 'success');
    else handleErrorToast(res);
    return res;
  };

  return { list, getById, create, update, remove };
};

export default useApiResponsavel;
