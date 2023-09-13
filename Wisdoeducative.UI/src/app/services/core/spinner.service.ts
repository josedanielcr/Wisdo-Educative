import { Injectable, ViewContainerRef } from '@angular/core';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private container : ViewContainerRef;
  private spinnerComponent : SpinnerComponent;

  constructor() { }

  public setContainer(container : ViewContainerRef) : void {
    this.container = container;
    this.container.clear();
    this.spinnerComponent = this.container.createComponent(SpinnerComponent).instance;
  }

  public show() : void {
    this.spinnerComponent.show();
  }

  public hide() : void {
    this.spinnerComponent.hide();
  }
}