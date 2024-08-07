import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAuthService } from './google-auth/google-auth.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GoogleAuthService],
})
export class AppModule {}
