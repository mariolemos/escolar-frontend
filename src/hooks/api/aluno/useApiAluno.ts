import { ApiResult, apiGet, apiPost, apiPut, apiDelete } from '@/services/api';
import { useToast } from '@/components/Toast';
import { Contato } from '@/layout/componets/ContatosForm';
import { Endereco } from '@/layout/componets/EnderecoForm/useEnderecoForm';

const base = 'aluno';

export interface IAlunoResponse {
    id: number;
    nome: string;
    dataNascimento: string;
    cpf: string;
    rg: string;
    turno: string;
    serie: string;
    turma: string;
    nomePai: string;
    nomeMae: string;
    convenioMedico: string;
    ativo: boolean;
    responsavelId: string;
    colegioId: string;
    contatos: Array<Contato>;
    endereco: Endereco;
}

export interface IAlunoRequest {
    nome: string;
    cpf: string;
    rg: string;
    turno: string;
    serie: string;
    turma: string;
    nomePai: string;
    nomeMae: string;
    responsavelId: string;
    colegioId: string;
    endereco: Endereco;
    contatos: Array<{
        tipo: string;
        contato: string;
    }>;
    dataNascimento?: Date | undefined;
    convenioMedico?: string | undefined;
}


export const useApiAluno = () => {
    const { showToast } = useToast();

    const handleErrorToast = (res: ApiResult<any>) => {
        if (!res) return showToast('Erro desconhecido', 'error');
        if (!res.success) {
            const msg = res.message || (res.body && (res.body.message || res.body.error)) || `Erro: ${res.status}`;
            showToast(msg, 'error');
        }
    };

    const list = async (): Promise<ApiResult<IAlunoResponse[]>> => {
        const res = await apiGet<IAlunoResponse[]>(`${base}`);
        if (!res.success) handleErrorToast(res);
        return res;
    };

    const getById = async (id: string): Promise<ApiResult<IAlunoResponse>> => {
        const res = await apiGet<IAlunoResponse>(`${base}/${id}`);
        if (!res.success) handleErrorToast(res);
        return res;
    };

    const create = async (payload: IAlunoRequest): Promise<ApiResult<IAlunoResponse>> => {
        const res = await apiPost<IAlunoResponse>(`${base}`, payload);
        if (res.success) showToast('Aluno criado com sucesso', 'success');
        else handleErrorToast(res);
        return res;
    };

    const update = async (id: string, payload: IAlunoRequest): Promise<ApiResult<IAlunoResponse>> => {
        const res = await apiPut<IAlunoResponse>(`${base}/${id}`, payload);
        if (res.success) showToast('Aluno atualizado com sucesso', 'success');
        else handleErrorToast(res);
        return res;
    };

    const remove = async (id: string): Promise<ApiResult<IAlunoResponse>> => {
        const res = await apiDelete<IAlunoResponse>(`${base}/${id}`);
        if (res.success) showToast('Aluno removido com sucesso', 'success');
        else handleErrorToast(res);
        return res;
    };

    return { list, getById, create, update, remove };
};

export default useApiAluno;
