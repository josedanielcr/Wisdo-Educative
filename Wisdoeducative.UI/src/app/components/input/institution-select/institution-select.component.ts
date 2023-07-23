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
  
  @Input() institutions: InstitutionClient[] = [
    new InstitutionClient(1, 'Harvard', 'Country 1', 'CC1', 'www.harvard.edu', 'Active'),
    new InstitutionClient(2, 'Oxford', 'Country 2', 'CC2', 'www.ox.ac.uk', 'Inactive'),
    new InstitutionClient(3, 'Stanford', 'Country 3', 'CC3', 'www.stanford.edu', 'Active'),
    new InstitutionClient(4, 'MIT', 'Country 4', 'CC4', 'www.mit.edu', 'Inactive'),
    new InstitutionClient(5, 'Cambridge', 'Country 5', 'CC5', 'www.cam.ac.uk', 'Active'),
    new InstitutionClient(6, 'Princeton', 'Country 6', 'CC6', 'www.princeton.edu', 'Inactive'),
    new InstitutionClient(7, 'Yale', 'Country 7', 'CC7', 'www.yale.edu', 'Active'),
    new InstitutionClient(8, 'Caltech', 'Country 8', 'CC8', 'www.caltech.edu', 'Inactive'),
    new InstitutionClient(9, 'Columbia', 'Country 9', 'CC9', 'www.columbia.edu', 'Active'),
    new InstitutionClient(10, 'University of Chicago', 'Country 10', 'CC10', 'www.uchicago.edu', 'Inactive')
  ];
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