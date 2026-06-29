export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  summary: string;
  format: 'landscape' | 'portrait' | 'square';
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  ok: true;
  id: string | null;
  receivedAt: string;
  targetEmail: string;
}
