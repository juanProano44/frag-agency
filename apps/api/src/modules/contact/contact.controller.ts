import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ContactPayload, ContactService } from './contact.service';

@ApiTags('Mailing')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post()
  @ApiOperation({ summary: 'Envía un correo de contacto a Frag Agency' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'email', 'message'],
      properties: {
        name: { type: 'string', example: 'Juan Proaño' },
        email: { type: 'string', example: 'juan@example.com' },
        message: {
          type: 'string',
          example: 'Necesito una propuesta para una sesión editorial.',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Correo enviado correctamente.',
    schema: {
      type: 'object',
      properties: {
        ok: { type: 'boolean', example: true },
        id: { type: 'string', example: 'msg_123456789' },
        receivedAt: { type: 'string', example: '2026-06-15T12:00:00.000Z' },
        targetEmail: {
          type: 'string',
          example: process.env.CONTACT_TO_EMAIL,
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Validación inválida.' })
  submit(@Body() payload: Partial<ContactPayload>) {
    const sanitized = this.validate(payload);

    return this.contactService.submit(sanitized);
  }

  private validate(payload: Partial<ContactPayload>): ContactPayload {
    const name = payload.name?.trim();
    const email = payload.email?.trim();
    const message = payload.message?.trim();

    if (!name || name.length < 2) {
      throw new BadRequestException('Nombre invalido.');
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new BadRequestException('Email invalido.');
    }

    if (!message || message.length < 10) {
      throw new BadRequestException('Mensaje demasiado corto.');
    }

    return { name, email, message };
  }
}
