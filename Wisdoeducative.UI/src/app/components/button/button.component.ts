import { Component, Input, OnInit } from '@angular/core';
import { ButtonType } from 'src/app/enums/button.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  ButtonType = ButtonType;
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() type: ButtonType = ButtonType.PRIMARY;
  @Input() fontAwesomeIcon : string = '';
  @Input() iconPath : string = '';
  public isFull : boolean = true;

  constructor() { }

  public getClassForButtonType(): {[key: string]: boolean} {
    return {
        'wd-bg-primary': this.type === ButtonType.PRIMARY,
        'wd-bg-secondary': this.type === ButtonType.SECONDARY,
        'wd-bg-bone': this.type === ButtonType.BONE,
        'wd-text-white': this.type === ButtonType.PRIMARY || this.type === ButtonType.SECONDARY,
        'wd-text-disabled': this.type === ButtonType.NOSTYLE,
        'btn-primary': this.type === ButtonType.PRIMARY,
        'btn-no-style': this.type === ButtonType.NOSTYLE,
        'wd-text-bold': this.type === ButtonType.BONE,
        'wd-bg-success': this.type === ButtonType.SUCCESS,
    };
  }
}