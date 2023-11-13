import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';


interface CourseStepperItem {
  code: string;
  index: number;
  icon: string;
  isActive : boolean;
}

@Component({
  selector: 'app-course-stepper',
  templateUrl: './course-stepper.component.html',
  styleUrls: ['./course-stepper.component.css']
})
export class CourseStepperComponent implements OnInit {

  public items: CourseStepperItem[] = [
    {
      code: 'Prom',
      index: 0,
      icon: 'fa-solid fa-book fa-lg',
      isActive : true
    },
    {
      code: 'Cal',
      index: 1,
      icon: 'fa-solid fa-book fa-lg',
      isActive : false
    },
    {
      code: 'Link',
      index: 2,
      icon: 'fa-solid fa-paperclip fa-lg',
      isActive : false
    }
  ]

  @Output() stepperItemIndexEmitter : EventEmitter<number> = new EventEmitter<number>();
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

  public activate(code : string): void {
    this.items.forEach(item => {
      if(item.code === code) {
        item.isActive = true;
        this.stepperItemIndexEmitter.emit(item.index);
      } else {
        item.isActive = false;
      }
    });
  }
}
