import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Injector, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { BaseInput } from '../base-input';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { InstitutionClient } from 'src/app/models/core/client/institution.client.model';

@Component({
  selector: 'app-institution-select',
  templateUrl: './institution-select.component.html',
  styleUrls: ['./institution-select.component.css',
              '../base-input-styles.css'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InstitutionSelectComponent),
        multi: true
      }
  ]
})
export class InstitutionSelectComponent extends BaseInput implements AfterViewInit, OnInit {
  
  @Input() institutions: InstitutionClient[];
  @Input() label : string;
  @Input() override value : any;
  @Input() error : string = '';
  public filteredInstitutions : InstitutionClient[] = [];
  public ngControl : NgControl;
  public dropdownOpen: boolean = false;

  constructor(private injector : Injector, 
              private cdf : ChangeDetectorRef) {
      super();
  }

  ngOnInit(): void {
    this.filteredInstitutions = this.institutions;
  }

  ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) { 
      this.ngControl.valueAccessor = this;
      this.cdf.detectChanges();
    }
  }

  override updateValue(event: Event): void {
    super.updateValue(event);
    let search : string = (event.target as HTMLInputElement).value;
    this.filteredInstitutions = this.institutions
      .filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  }

  public setToInput(institutionName : string): void {
    this.value = institutionName;
    super.updateAndNotify(this.value);
    this.closeDropdown();
  }

  public openDropdown() {
    this.dropdownOpen = true;
  }

  public closeDropdown() {
    this.dropdownOpen = false;
  }
}