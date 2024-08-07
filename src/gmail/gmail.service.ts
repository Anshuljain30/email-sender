import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuthService } from '../google-auth/google-auth.service';

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
    const { createReadStream } = require('fs');
    const { google } = require('googleapis');
    const mime = require('mime-types');
    const base64url = require('base64-url');

    const boundary = '---';
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
      `Content-Type: ${mime.lookup(attachmentPath)}; name="${attachmentPath
        .split('/')
        .pop()}"`,
      `Content-Disposition: attachment; filename="${attachmentPath
        .split('/')
        .pop()}"`,
      `Content-Transfer-Encoding: base64`,
      '',
      base64url.encode(createReadStream(attachmentPath).toString('base64')),
      `--${boundary}--`,
    ];

    const rawMessage = messageParts.join('\n');

    const res = await this.gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: base64url.encode(rawMessage),
      },
    });

    return res.data;
  }
}
