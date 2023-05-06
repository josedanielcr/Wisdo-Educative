import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private http : HttpClient) { }

  getExample(){
    return this.http.get(environment.apiUrl + 'Example')
  }
}