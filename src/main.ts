import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// let userID: string | null = '';
// userID = sessionStorage.getItem('userID');
// console.log('main.ts - userID :' + userID);
