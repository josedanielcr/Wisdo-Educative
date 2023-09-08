import { Injectable } from '@angular/core';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationErrorService {

  private readonly DEFAULT_ERROR_MESSAGE : string = 'Something went wrong!';

  constructor() { }

  public parseHttpError(error : any): ApplicationErrorModel {
    const errorData = error.error;
    const erorr : ApplicationErrorModel = new ApplicationErrorModel(errorData.error,errorData.statusCode);
    return erorr;
  }
}
