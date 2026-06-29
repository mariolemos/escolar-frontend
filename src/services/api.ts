// src/services/api.ts
// Estrutura base para integração com uma API REST usando fetch
import { handleErrorResponse, normalizeAndRethrow } from './errorHandler';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

function buildUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export type RequestOptions = {
  token?: string;
  headers?: Record<string, string>;
};

function getStoredToken(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  } catch (e) {
    return null;
  }
}

function buildHeaders(contentType = 'application/json') {
  const headers: Record<string, string> = {};
  if (contentType) headers['Content-Type'] = contentType;
  const token = getStoredToken();
  console.log('Construindo headers para API:', { contentType, token });
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; status: number; message: string; body?: any };

export async function apiGet<T>(path: string): Promise<ApiResult<T>> {
  const url = buildUrl(path);
  const response = await fetch(url, { headers: buildHeaders() });

  if (!response.ok) {
    // try parse error body
    let errorBody: any = null;
    try {
      errorBody = await response.json();
    } catch (e) {
      console.warn('Não foi possível parsear o corpo de erro como JSON:', e);
      // ignore parse error
    }
    const message = (errorBody && (errorBody.message || errorBody.error)) || response.statusText || `Request failed with status ${response.status}`;
    return { success: false, status: response.status, message, body: errorBody };
  }

  const data = await response.json();
  return { success: true, data };
}

export async function apiPost<T>(path: string, data: any): Promise<ApiResult<T>> {
  const url = buildUrl(path);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: buildHeaders('application/json'),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorBody: any = null;
      try {
        errorBody = await response.json();
      } catch (e) {
        console.warn('Não foi possível parsear o corpo de erro como JSON:', e);
      }
      const message = (errorBody && (errorBody.message || errorBody.error)) || response.statusText || `Request failed with status ${response.status}`;
      return { success: false, status: response.status, message, body: errorBody };
    }

    const dataResp = await response.json();
    return { success: true, data: dataResp };

  } catch (err: any) {
    console.error('Erro na requisição POST:', err);
    const message = err?.message || 'Erro na requisição POST';
    return { success: false, status: 0, message, body: err };
  }
}


export async function apiPostLogin<T>(path: string, data: any): Promise<ApiResult<T>> {
  // const url = buildUrl(path);
  const url = `https://escolar-api-ved3a.ondigitalocean.app/api/${path}`;
  console.log('Enviando dados para login:', url);
  try {
    console.log('Dados enviados para login:', data);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorBody: any = null;
      try {
        errorBody = await response.json();
      } catch (e) {
        console.warn('Não foi possível parsear o corpo de erro como JSON:', e);
      }
      const message = (errorBody && (errorBody.message || errorBody.error)) || response.statusText || `Request failed with status ${response.status}`;
      return { success: false, status: response.status, message, body: errorBody };
    }

    const dataResp = await response.json();
    return { success: true, data: dataResp };

  } catch (err: any) {
    console.error('Erro na requisição POST (login):', err);
    const message = err?.message || 'Erro na requisição POST (login)';
    return { success: false, status: 0, message, body: err };
  }
}

export async function apiPut<T>(path: string, data: any): Promise<ApiResult<T>> {
  const url = buildUrl(path);
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: buildHeaders('application/json'),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorBody: any = null;
      try {
        errorBody = await response.json();
      } catch (e) {
        console.warn('Não foi possível parsear o corpo de erro como JSON:', e);
      }
      const message = (errorBody && (errorBody.message || errorBody.error)) || response.statusText || `Request failed with status ${response.status}`;
      return { success: false, status: response.status, message, body: errorBody };
    }

    const dataResp = await response.json();
    return { success: true, data: dataResp };
  } catch (err: any) {
    console.error('Erro na requisição PUT:', err);
    const message = err?.message || 'Erro na requisição PUT';
    return { success: false, status: 0, message, body: err };
  }
}

// Adicione outros métodos (DELETE) conforme necessário.