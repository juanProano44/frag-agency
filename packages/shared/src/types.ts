export type AlertStatus = "info" | "success" | "warning" | "error";

export type ButtonVariant = "contained" | "outlined" | "text" | "icon";

export type ButtonSize = "small" | "medium" | "large";

export type BadgeMode = "label" | "numeric" | "dot";

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
