import { AfterViewInit, ChangeDetectorRef, Component, Injector, Input, forwardRef } from '@angular/core';
import { BaseInput } from '../base-input';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css', '../base-input-styles.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent extends BaseInput implements AfterViewInit {

  @Input() placeholder: string;
  @Input() label : string;
  @Input() override value : string = '';
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