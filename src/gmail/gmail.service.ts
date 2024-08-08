import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuthService } from '../google-auth/google-auth.service';
import { readFileSync } from 'fs';
import { Buffer } from 'buffer';
import * as mime from 'mime-types';

@Injectable()
export class GmailService {
  private gmail;

  constructor(private readonly googleAuthService: GoogleAuthService) {
    this.gmail = google.gmail({
      version: 'v1',
      auth: this.googleAuthService.getOAuth2Client(),
    });
  }

  async sendMail(
    to: string,
    recipientName: string,
    subject: string,
    text: string,
    attachmentPath: string,
  ) {
    const boundary = '---boundary123'; // A more descriptive boundary
    const attachmentName = attachmentPath.split('/').pop();
    const attachmentMimeType =
      mime.lookup(attachmentPath) || 'application/octet-stream';

    // Read file synchronously
    const attachmentData = readFileSync(attachmentPath);
    const attachmentBase64 = Buffer.from(attachmentData).toString('base64');

    const messageParts = [
      `From: your-email@gmail.com`,
      `To: ${to}`,
      `Subject: ${subject}`,
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      `Content-Type: text/plain; charset="UTF-8"`,
      '',
      text.replace('Receiver', recipientName),
      '',
      `--${boundary}`,
      `Content-Type: ${attachmentMimeType}; name="${attachmentName}"`,
      `Content-Disposition: attachment; filename="${attachmentName}"`,
      `Content-Transfer-Encoding: base64`,
      '',
      attachmentBase64,
      '',
      `--${boundary}--`,
    ];

    const rawMessage = messageParts.join('\n');

    // Encode raw message
    const encodedMessage = Buffer.from(rawMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await this.gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    return res.data;
  }
}
