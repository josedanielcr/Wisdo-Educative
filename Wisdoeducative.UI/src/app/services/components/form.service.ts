import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  /**
   * This function validates a form and returns an instance of a class if the form is valid, otherwise it
   * marks the controls as touched and returns null.
   * @param {FormGroup} form 
   * @param classRef
   */
  public validateForm<T>(form : FormGroup, classRef : new () => T): T | null {
    form.markAllAsTouched();
    if(form.valid){
      const instance = new classRef();
      Object.assign(instance, form.value);
      return instance;
    } else {
      return null;
    }
  }
}