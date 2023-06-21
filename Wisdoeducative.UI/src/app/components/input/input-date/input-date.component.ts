import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { BaseInput } from '../base-input';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class InputDateComponent extends BaseInput {

    @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
    
    @Input() width : number;
    @Input() height : number;
    @Input() placeholder : string;
    @Input() label : string;
    @Input() override value : Date;

    constructor() {
        super();
    }
    
    public openDatePicker() {
        this.dateInput.nativeElement.showPicker();
    }
}