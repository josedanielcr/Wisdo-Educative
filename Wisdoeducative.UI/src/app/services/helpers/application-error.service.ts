import { Injectable } from '@angular/core';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationErrorService {

  constructor() { }

  public parseHttpError(error : any): ApplicationErrorModel {
    return new ApplicationErrorModel(error.message,error.statusCode);
  }
}
