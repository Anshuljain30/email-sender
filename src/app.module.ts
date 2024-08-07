import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { GmailService } from './gmail/gmail.service';
import { EmailController } from './email/email.controller';
import { ExcelService } from './excel/excel.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, EmailController, AuthController],
  providers: [AppService, GoogleAuthService, GmailService, ExcelService],
})
export class AppModule {}
