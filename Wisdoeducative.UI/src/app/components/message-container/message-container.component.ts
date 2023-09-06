import { Component } from '@angular/core';
import { MessageModel } from 'src/app/models/message.model';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent {

  public messages : MessageModel[] = [];
  public isVisible : boolean = false;
  private intervalId : any;

  constructor() {
    this.initAutoRemove();
   }

  private initAutoRemove() {
    if(this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if(!this.isVisible) return;
      if(this.messages.length > 0) this.remove();
      if(this.messages.length == 0) this.isVisible = false;
    }, 5000);
  }

  public show(message : MessageModel) : void {
    this.add(message);
    if(this.messages.length > 0) this.isVisible = true;
  }

  public hide() : void {
    this.remove();
    if(this.messages.length == 0) this.isVisible = false;
  }

  public add(message : MessageModel) : void {
    if(this.messages.length >= 3) this.remove();
    this.messages.push(message);
    this.initAutoRemove();
  }

  public remove() : void {
    this.messages.shift();
  }

  public closeMessage(messageIndex : number) {
    this.messages.splice(messageIndex, 1);
    if(this.messages.length == 0) this.isVisible = false;
  }
}