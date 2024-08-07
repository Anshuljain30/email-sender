import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { GmailService } from './gmail/gmail.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GoogleAuthService, GmailService],
})
export class AppModule {}
