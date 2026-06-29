import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesService {
  async list() {
    return this.getFallbackServices();
  }

  private getFallbackServices() {
    return [
      {
        id: 'branding',
        title: 'Branding Fotográfico',
        summary: 'Identidad visual para estudios y marcas de fotografía.',
      },
      {
        id: 'web',
        title: 'Sitios de Portafolio',
        summary: 'Sitios enfocados en galerías con narrativa visual y conversión.',
      },
      {
        id: 'content',
        title: 'Producción de Contenido',
        summary: 'Dirección creativa y captura para campañas digitales.',
      },
    ];
  }
}
