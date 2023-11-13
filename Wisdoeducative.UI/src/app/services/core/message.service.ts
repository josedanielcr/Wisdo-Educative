import { Injectable, ViewContainerRef } from '@angular/core';
import { MessageContainerComponent } from 'src/app/components/message-container/message-container.component';
import { MessageComponent } from 'src/app/components/message/message.component';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { MessageModel } from 'src/app/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private container : ViewContainerRef;
  private messageContainer : MessageContainerComponent;

  constructor() { }

  public setContainer(container : ViewContainerRef) : void {
    this.container = container;
    this.container.clear();
    this.messageContainer = this.container.createComponent(MessageContainerComponent).instance;
  }

  public show(message : MessageModel) : void {
    this.messageContainer.show(message);
  }

  public hide() : void {
    this.messageContainer.hide();
  }
}