import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { DynamicHooksModule, HookParserEntry } from 'ngx-dynamic-hooks';
// import { TestComponent } from './test/test.component';

const componentParsers: Array<HookParserEntry> = [
  // {component: TestComponent},
  { component: {
      importPromise: () => import('./test/test.component'),
      importName: "TestComponent"
    },
    selector: "app-test"
  },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(DynamicHooksModule.forRoot({
      globalParsers: componentParsers,
      globalOptions: { sanitize: false }
    })),]
};
