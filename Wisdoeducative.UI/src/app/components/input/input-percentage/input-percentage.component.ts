import { AfterViewInit, ChangeDetectorRef, Component, Injector, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { BaseInput } from '../base-input';

@Component({
  selector: 'app-input-percentage',
  templateUrl: './input-percentage.component.html',
  styleUrls: ['./input-percentage.component.css' , '../base-input-styles.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPercentageComponent),
      multi: true
    }
  ]
})
export class InputPercentageComponent extends BaseInput implements AfterViewInit {

  @Input() placeholder: string;
  @Input() label : string;
  @Input() override value : number = 0;
  @Input() error : string = '';
  public ngControl : NgControl;
  public hasError : boolean = false;

  constructor(private injector : Injector, private cdf : ChangeDetectorRef) {
    super();
    super.value = this.value;
  }

  ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) { 
      this.ngControl.valueAccessor = this;
      this.cdf.detectChanges();
    }
  } 
}
