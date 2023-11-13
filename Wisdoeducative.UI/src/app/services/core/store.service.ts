import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private store: Map<string, BehaviorSubject<any>> = new Map();

  constructor() { }

  set(key: string, value: any): void {
    if (!this.store.has(key)) {
      this.store.set(key, new BehaviorSubject(value));
    } else {
      this.store.get(key).next(value);
    }
  }

  select<T>(key: string): Observable<T> {
    if (!this.store.has(key)) {
      return EMPTY;
    }
    return this.store.get(key).asObservable();
  }
}