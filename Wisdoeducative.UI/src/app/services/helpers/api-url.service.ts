import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  constructor() {}

  public checkEnvironment(): string {
    if(window.location.href.indexOf('localhost') > -1) {
      return environment.local;
    } else {
      return environment.api;
    }
  }
}