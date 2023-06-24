import { Component, Input, forwardRef } from '@angular/core';
import { BaseInput } from '../base-input';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class InputTextComponent extends BaseInput {

    @Input() width: number;
    @Input() height: number;
    @Input() placeholder: string;
    @Input() label : string;
    @Input() override value : string = '';

    constructor() {
        super();
        super.value = this.value;
    }
}