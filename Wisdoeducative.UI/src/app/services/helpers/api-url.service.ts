import { Injectable, isDevMode } from '@angular/core';
import { environment, environmentDev } from 'src/config/environments.config';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  constructor() {}

  public checkEnvironment(): string {
    if(isDevMode()){
      if(window.location.href.indexOf('localhost') > -1) {
        return environmentDev.apiDevLocal;
      }
      return environmentDev.apiDevRemote;
    } else {
      return environment.apiUrl;
    }
  }
}