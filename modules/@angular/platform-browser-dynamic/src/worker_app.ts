import {WORKER_APP_APPLICATION_PROVIDERS, workerAppPlatform} from '@angular/platform-browser';
import {COMPILER_PROVIDERS, XHR} from '@angular/compiler';
import {WebWorkerXHRImpl} from './web_workers/worker/xhr_impl';
import {isPresent} from './facade/lang';

import {
  PlatformRef,
  Type,
  ComponentRef,
  ReflectiveInjector,
  coreLoadAndBootstrap,
} from '@angular/core';

export const WORKER_APP_DYNAMIC_APPLICATION_PROVIDERS: Array<any /*Type | Provider | any[]*/> = [
  WORKER_APP_APPLICATION_PROVIDERS,
  COMPILER_PROVIDERS,
  WebWorkerXHRImpl,
  /* @ts2dart_Provider */ {provide: XHR, useExisting: WebWorkerXHRImpl}
];

export function bootstrapApp(
    appComponentType: Type,
    customProviders?: Array<any /*Type | Provider | any[]*/>): Promise<ComponentRef<any>> {
  var appInjector = ReflectiveInjector.resolveAndCreate(
      [WORKER_APP_DYNAMIC_APPLICATION_PROVIDERS, isPresent(customProviders) ? customProviders : []],
      workerAppPlatform().injector);
  return coreLoadAndBootstrap(appInjector, appComponentType);
}
