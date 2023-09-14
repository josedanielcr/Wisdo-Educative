import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/services/core/translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

  public activeLang : string;
  public isSetup : boolean = false;
  
  constructor(private translationService : TranslationService,
    private router : Router) { }

  ngOnInit(): void {
    this.activeLang = this.translationService.getActiveLang();
    this.isSetup = this.router.url.includes('setup');
  }

  public setActiveLang(lang: string): void {
    this.translationService.setActiveLang(lang);
    this.activeLang = lang;
  }
}
