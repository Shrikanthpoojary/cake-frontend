import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
      // localStorage.setItem("custid","0")
      //  localStorage.setItem("login", "0");
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
