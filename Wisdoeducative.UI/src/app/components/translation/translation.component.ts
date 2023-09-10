import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/core/translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent {
  
  constructor(private translationService : TranslationService) { }

  public setActiveLang(lang: string): void {
    this.translationService.setActiveLang(lang);
  }
}
