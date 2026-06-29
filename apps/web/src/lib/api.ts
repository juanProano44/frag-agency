import type {
  ContactPayload,
  ContactResponse,
  ProjectItem,
  ServiceItem,
} from '../types/domain';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function getServices() {
  return fetch(`${API_BASE_URL}/services`).then((response) =>
    parseJson<ServiceItem[]>(response),
  );
}

export function getProjects() {
  return fetch(`${API_BASE_URL}/projects`).then((response) =>
    parseJson<ProjectItem[]>(response),
  );
}

export function sendContact(payload: ContactPayload) {
  return fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => parseJson<ContactResponse>(response));
}
