import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Injector, Input, ViewChild, forwardRef } from '@angular/core';
import { BaseInput } from '../base-input';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css', '../base-input-styles.css'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputDateComponent),
        multi: true
      }
  ]
})
export class InputDateComponent extends BaseInput implements AfterViewInit {

  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  @Input() placeholder : string;
  @Input() label : string;
  @Input() error : string = '';
  @Input() override value : Date;
  public ngControl : NgControl;

  constructor(private injector : Injector, private cdf : ChangeDetectorRef) {
      super();
  }

  ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) { 
      this.ngControl.valueAccessor = this;
      this.cdf.detectChanges();
    }
  }
  
  public openDatePicker() {
      this.dateInput.nativeElement.showPicker();
  }
}