export { AppServerModule } from './app/app.server.module';
import { enableProdMode } from '@angular/core';
export { ngExpressEngine } from '@nguniversal/express-engine';
export { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

enableProdMode();