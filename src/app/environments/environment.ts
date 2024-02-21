export const environment = {
  production: false,
  apiUrl: 'https://localhost:7160/api/',
  msalConfig: {
    clientId: '78e1557c-a3e9-4e8d-a734-663e72bc722e',
    redirectUri: 'http://localhost:4200',
    authority:
      'https://login.microsoftonline.com/5b751804-232f-410d-bb2f-714e3bb466eb',
    cacheLocation: 'localStorage',
    protectedResourceMap: 'https://graph.microsoft.com/v1.0/me',
  },
  postLogoutRedirectUri: 'http://localhost:4200',
  decodedRole: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  decodedUserID:
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
};