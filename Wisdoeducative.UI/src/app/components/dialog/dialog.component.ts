import { Component, Input, OnInit } from '@angular/core';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() public title: string = '';
  @Input() public minHeight : number = 30;
  public isVisible: boolean = false;
  public isDesktop: boolean = false;
  public isTablet: boolean = false;
  public isPhone: boolean = false;
  
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

  public show(): void {
    this.isVisible = true;
  }

  public hide(): void {
    this.isVisible = false;
  }

  public toggle(): void {
    this.isVisible = !this.isVisible;
  }
}