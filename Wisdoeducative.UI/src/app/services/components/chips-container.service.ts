import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChipsContainerService {

  private variableSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  public getVariableSubject() : Observable<any> {
    return this.variableSubject.asObservable();
  }

  public setVariableSubject(value : any) : void {
    this.variableSubject.next(value);
  }

}