import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmissionResult {
  ok: true;
  id: string | null;
  receivedAt: string;
  targetEmail: string;
}

@Injectable()
export class ContactService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async submit(payload: ContactPayload) {
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? 'TIC Agency <onboarding@resend.dev>';
    const targetEmail =
      process.env.CONTACT_TO_EMAIL ?? 'juanjobabu@gmail.com';

    try {
      const { data, error } = await this.resend.emails.send({
        from: fromEmail,
        to: [targetEmail],
        replyTo: payload.email,
        subject: `Nuevo mensaje de contacto: ${payload.name}`,
        html: `
          <div style="background-color: #f7f7f7; padding: 40px 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid #111111; padding: 40px; box-sizing: border-box;">
              <!-- Cabecera -->
              <div style="border-bottom: 1px solid #111111; padding-bottom: 24px; margin-bottom: 32px;">
                <div style="font-size: 24px; font-weight: 900; letter-spacing: -0.04em; color: #111111; text-transform: uppercase; line-height: 1;">
                  Frag Agency
                </div>
                <div style="font-size: 10px; font-weight: bold; letter-spacing: 0.16em; color: #a01c30; text-transform: uppercase; margin-top: 8px;">
                  Contacto Recibido
                </div>
              </div>

              <!-- Contenido -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 11px; font-weight: bold; letter-spacing: 0.1em; color: #5a5252; text-transform: uppercase; margin-bottom: 6px;">
                  Nombre
                </div>
                <div style="font-size: 16px; color: #111111; font-weight: 500; margin-bottom: 24px;">
                  ${escapeHtml(payload.name)}
                </div>

                <div style="font-size: 11px; font-weight: bold; letter-spacing: 0.1em; color: #5a5252; text-transform: uppercase; margin-bottom: 6px;">
                  Correo Electrónico
                </div>
                <div style="font-size: 16px; margin-bottom: 24px;">
                  <a href="mailto:${escapeHtml(payload.email)}" style="color: #a01c30; text-decoration: none; font-weight: 500;">
                    ${escapeHtml(payload.email)}
                  </a>
                </div>

                <div style="font-size: 11px; font-weight: bold; letter-spacing: 0.1em; color: #5a5252; text-transform: uppercase; margin-bottom: 6px;">
                  Mensaje
                </div>
                <div style="font-size: 15px; line-height: 1.6; color: #111111; background-color: #fdf8f8; border: 1px solid #111111; padding: 20px; white-space: pre-wrap;">${escapeHtml(payload.message)}</div>
              </div>

              <!-- Pie de página -->
              <div style="border-top: 1px solid #111111; padding-top: 24px; margin-top: 40px; font-size: 11px; color: #5a5252; line-height: 1.5;">
                <p style="margin: 0 0 8px 0;">Este mensaje fue enviado desde el formulario de contacto de tu sitio web.</p>
                <p style="margin: 0; font-weight: bold; color: #111111; text-transform: uppercase; letter-spacing: 0.05em;">© Frag Agency — Built with FragUI</p>
              </div>
            </div>
          </div>
        `,
        text: [
          `FRAG AGENCY — CONTACTO`,
          `======================`,
          ``,
          `Nombre: ${payload.name}`,
          `Email: ${payload.email}`,
          ``,
          `Mensaje:`,
          `----------------------`,
          payload.message,
          ``,
          `======================`,
          `Enviado desde el formulario de contacto.`
        ].join('\n'),
      });

      if (error || !data?.id) {
        throw error ?? new Error('Resend no devolvió un identificador.');
      }

      return {
        ok: true,
        id: data.id,
        receivedAt: new Date().toISOString(),
        targetEmail,
      } satisfies ContactSubmissionResult;
    } catch (err) {
      console.error('Resend error:', err);
      throw new InternalServerErrorException(
        'No se pudo enviar el mensaje de contacto.',
      );
    }
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
