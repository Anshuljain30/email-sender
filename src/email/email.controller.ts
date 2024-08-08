import { Controller, Res, Get, Query } from '@nestjs/common';
import { Response } from 'express';
import { GmailService } from '../gmail/gmail.service';
import { GoogleAuthService } from '../google-auth/google-auth.service';
import { ExcelService } from '../excel/excel.service';
import { contactDetails, emailDetails } from '../app.constants';

@Controller('email')
export class EmailController {
  constructor(
    private readonly gmailService: GmailService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly excelService: ExcelService,
  ) {}

  @Get('/send')
  async sendEmails(@Res() res: Response) {
    const url = await this.googleAuthService.getAuthUrl();
    res.redirect(url);
  }

  @Get('/callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    // Get OAuth tokens
    await this.googleAuthService.getToken(code);
    const recipients = await this.excelService.readExcel(contactDetails);
    for (const recipient of recipients) {
      await this.gmailService.sendMail(
        recipient.email,
        recipient.name,
        emailDetails.subject,
        emailDetails.body,
        emailDetails.attachment,
      );
    }
    return res.redirect(302, 'http://localhost:3000/email/success');
  }

  @Get('/success')
  async showSuccess(@Res() res: Response) {
    return res.status(200).send('Emails sent successfully');
  }
}
