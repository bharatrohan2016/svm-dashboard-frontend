// src/utils/googleDriveAuth.js
import { google } from 'googleapis';

const auth = new google.auth.OAuth2({
  clientId: '444654676473-idspg4f310k71ht4h16s63phmgbth5ue.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: 'http://localhost:3001/famers',
});

export const getAuthUrl = () => {
  return auth.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.readonly'],
  });
};

export const getDrive = async (code) => {
  const tokens = await auth.getToken(code);
  auth.setCredentials(tokens);
  return google.drive({ version: 'v3', auth });
};
