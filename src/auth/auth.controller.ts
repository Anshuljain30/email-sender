import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthService } from '../google-auth/google-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get('/authorize')
  async authorize(@Res() res: Response) {
    const url = await this.googleAuthService.getAuthUrl();
    res.redirect(url);
  }

  @Get('/callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    const tokens = await this.googleAuthService.getToken(code);

    // Redirect or respond with tokens
    res.send(tokens);
  }
}
