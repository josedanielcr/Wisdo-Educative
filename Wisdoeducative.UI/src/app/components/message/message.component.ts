
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { MessageModel } from 'src/app/models/message.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public isVisible : boolean =  true;
  @Input() public title : string;
  @Input() public text : string;
  @Input() public type : MessageTypeEnum;
  @Output() public wasClosed : EventEmitter<void> = new EventEmitter<void>();
  public MessageTypeEnum = MessageTypeEnum;

  //util
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;

  constructor(private windowService : WindowResizeService) { }

  ngOnInit(): void {
    this.subscribeToWindowService();
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  public getImagePath(): string {
    if(this.type === MessageTypeEnum.Error) return '../../../assets/icons/sad-face 2.png';
    else return '../../../assets/icons/happy 1.png';
  }

  public close() : void {
    this.isVisible = false;
    this.wasClosed.emit();
  }
}