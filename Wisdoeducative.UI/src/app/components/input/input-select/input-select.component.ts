import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Injector, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { BaseInput } from '../base-input';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { SelectOptionModel } from 'src/app/models/select.option.model';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css', '../base-input-styles.css'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputSelectComponent),
        multi: true
      }
  ]
})
export class InputSelectComponent extends BaseInput implements AfterViewInit {

  @ViewChild('selectComponent', { static: false }) mySelectRef: ElementRef;
  
  @Input() options : SelectOptionModel[];
  @Input() defaultOption : SelectOptionModel;
  @Input() label : string;
  @Input() override value : any;
  @Input() error : string = '';
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
    this.setFirstValue();
    this.cdf.detectChanges();
  }

  private setFirstValue() {
    this.value = this.options[0].value;
    super.updateAndNotify(this.value);
  }
}