// src/services/api.ts
// Estrutura base para integração com uma API REST usando fetch

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || '';

function buildUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export async function apiGet<T>(path: string): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }
  return response.json();
}

export async function apiPost<T>(path: string, data: any): Promise<T> {
  const url = buildUrl(path);
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
}

// Adicione outros métodos (PUT, DELETE) conforme necessário.