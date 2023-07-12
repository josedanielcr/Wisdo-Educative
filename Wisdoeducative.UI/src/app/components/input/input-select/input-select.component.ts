import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { BaseInput } from '../base-input';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class InputSelectComponent extends BaseInput {

  @ViewChild('selectComponent', { static: false }) mySelectRef: ElementRef;
  
  @Input() options : SelectOptionModel[];
  @Input() defaultOption : SelectOptionModel;
  @Input() height : number;
  @Input() width : number; 
  @Input() label : string;
  @Input() override value : any;

  constructor() {
      super();
  }
}