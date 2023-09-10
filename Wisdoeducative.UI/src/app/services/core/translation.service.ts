import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translocoService : TranslocoService) {}

  public setActiveLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.setUserDefaultLang(lang);
  }

  public setUserDefaultLang(lang: string): void {
  }
}
