// src/services/api.ts
// Estrutura base para integração com uma API REST usando fetch

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

export async function apiGet<T>(path: string): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, { headers: buildHeaders() });
  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }
  return response.json();
}

export async function apiPost<T>(path: string, data: any): Promise<T> {
  const url = buildUrl(path);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: buildHeaders('application/json'),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erro ao enviar dados: ${response.statusText}`);
    }
    return response.json();

  } catch (err) {
    console.error('Erro na requisição POST:', err);
    throw err;
  }
}


export async function apiPostLogin<T>(path: string, data: any): Promise<T> {
  const url = buildUrl(path);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erro ao enviar dados: ${response.statusText}`);
    }
    return response.json();

  } catch (err) {
    console.error('Erro na requisição POST:', err);
    throw err;
  }
}

export async function apiPut<T>(path: string, data: any): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: 'PUT',
    headers: buildHeaders('application/json'),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Erro ao enviar dados: ${response.statusText}`);
  }
  return response.json();
}

// Adicione outros métodos (DELETE) conforme necessário.