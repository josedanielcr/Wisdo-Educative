import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageModel } from 'src/app/models/message.model';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent {

  public messages : MessageModel[] = [];
  public isVisible : boolean = false;

  constructor() { }

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
  }

  public remove() : void {
    this.messages.shift();
  }

  public closeMessage(messageIndex : number) {
    this.messages.splice(messageIndex, 1);
    if(this.messages.length == 0) this.isVisible = false;
  }
}