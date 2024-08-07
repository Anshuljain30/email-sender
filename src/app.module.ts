import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { GmailService } from './gmail/gmail.service';
import { EmailController } from './email/email.controller';

@Module({
  imports: [],
  controllers: [AppController, EmailController],
  providers: [AppService, GoogleAuthService, GmailService],
})
export class AppModule {}
