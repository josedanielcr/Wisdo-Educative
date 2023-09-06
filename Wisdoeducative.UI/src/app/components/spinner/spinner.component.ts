import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  public isVisible : boolean = false;

  constructor() { }

  public hide() : void {
    this.isVisible = false;
  }

  public show() : void {
    this.isVisible = true;
  }
}
