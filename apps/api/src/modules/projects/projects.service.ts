import { Injectable } from '@nestjs/common';
import { PrismaClient, PortfolioItem } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

type PortfolioRecord = PortfolioItem;
type PortfolioFormat = 'landscape' | 'portrait' | 'square';
type PortfolioQueryResult = PortfolioRecord[];

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    try {
      const prisma = this.prisma as PrismaClient;
      const records = (await prisma.portfolioItem.findMany({
        orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }],
      })) as PortfolioQueryResult;

      return records.length > 0
        ? records.map((record) => this.toProjectItem(record))
        : this.getFallbackProjects();
    } catch (error) {
      console.error('Falling back to in-memory portfolio items:', error);
      return this.getFallbackProjects();
    }
  }

  private cleanImageUrl(url: string): string {
    if (!url) return url;
    // 1. Reemplazar /object/sign/ por /object/public/
    let cleaned = url.replace('/object/sign/', '/object/public/');
    // 2. Remover el query string (?token=...)
    const questionMarkIndex = cleaned.indexOf('?');
    if (questionMarkIndex !== -1) {
      cleaned = cleaned.substring(0, questionMarkIndex);
    }
    return cleaned;
  }

  private toProjectItem(record: PortfolioRecord) {
    return {
      id: record.id,
      title: record.title === 'photo 2' ? 'Horizontes de Luz' : record.title,
      category: record.category,
      imageUrl: this.cleanImageUrl(record.imageUrl),
      summary: record.summary,
      format: this.normalizeFormat(record.format),
    };
  }

  private normalizeFormat(value: string): PortfolioFormat {
    if (value === 'portrait' || value === 'square') {
      return value;
    }

    return 'landscape';
  }

  private getFallbackProjects() {
    return [
      {
        id: 'photo-2',
        title: 'Horizontes de Luz',
        category: 'Paisaje',
        summary: 'Captura de entorno natural con énfasis en la geometría y luz editorial.',
        format: 'landscape',
        imageUrl: 'https://liabsnxydrjwdgimkluy.supabase.co/storage/v1/object/public/photos-bucket/photos/2.jpg',
      },
      {
        id: 'photo-10',
        title: 'El Silencio del Valle',
        category: 'Paisaje',
        summary: 'Composición de horizontes abiertos bajo luz suavizada en exteriores.',
        format: 'landscape',
        imageUrl: 'https://liabsnxydrjwdgimkluy.supabase.co/storage/v1/object/public/photos-bucket/photos/10.jpg',
      },
      {
        id: 'photo-12',
        title: 'Esencia Editorial',
        category: 'Retrato',
        summary: 'Estudio de carácter y dirección de arte en sesión controlada.',
        format: 'portrait',
        imageUrl: 'https://liabsnxydrjwdgimkluy.supabase.co/storage/v1/object/public/photos-bucket/photos/12.jpeg',
      },
      {
        id: 'photo-14',
        title: 'Luz y Carácter',
        category: 'Retrato',
        summary: 'Dirección de modelos y encuadre con intención dramática.',
        format: 'portrait',
        imageUrl: 'https://liabsnxydrjwdgimkluy.supabase.co/storage/v1/object/public/photos-bucket/photos/14.jpeg',
      },
    ];
  }
}
