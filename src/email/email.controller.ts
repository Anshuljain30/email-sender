import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { GmailService } from '../gmail/gmail.service';
import { GoogleAuthService } from '../google-auth/google-auth.service';
import { ExcelService } from '../excel/excel.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly gmailService: GmailService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly excelService: ExcelService,
  ) {}

  @Post('/send')
  async sendEmails(
    @Body()
    body: {
      filePath: string;
      subject: string;
      text: string;
      attachmentPath: string;
      authCode: string;
    },
    @Res() res: Response,
  ) {
    const { filePath, subject, text, attachmentPath, authCode } = body;
    const recipients = await this.excelService.readExcel(filePath);

    // Get OAuth tokens
    await this.googleAuthService.getToken(authCode);

    for (const recipient of recipients) {
      await this.gmailService.sendMail(
        recipient.email,
        subject,
        text,
        attachmentPath,
      );
    }

    return res.status(200).send('Emails sent successfully');
  }
}
