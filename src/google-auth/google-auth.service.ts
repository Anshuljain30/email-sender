import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleAuthService {
  private oauth2Client;

  constructor() {
    const { client_id, client_secret, redirect_uris } =
      require('../../credentials.json').web;

    this.oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );
  }

  async getAuthUrl() {
    const scopes = ['https://www.googleapis.com/auth/gmail.send'];
    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
    return url;
  }

  async getToken(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    return tokens;
  }

  getOAuth2Client() {
    return this.oauth2Client;
  }
}
