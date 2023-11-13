import { Component, Input, OnInit } from '@angular/core';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() title : string;
  @Input() iconPath : string;
  @Input() iconBackgroundColor : string;
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;

  constructor(private windowResizingService : WindowResizeService) { }

  ngOnInit(): void {
    this.subscribeToWindowService();
  }

  private subscribeToWindowService() {
    this.windowResizingService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }
}