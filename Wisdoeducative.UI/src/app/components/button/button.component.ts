import { Component, Input } from '@angular/core';
import { ButtonType } from 'src/app/enums/button.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

    ButtonType = ButtonType;
    @Input() height : number = 40;
    @Input() width : number = 150;
    @Input() text: string = '';
    @Input() disabled: boolean = false;
    @Input() type: ButtonType = ButtonType.PRIMARY;
    constructor() { }
}