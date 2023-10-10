import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.css']
})
export class PomodoroTimerComponent implements OnInit, AfterViewInit {

  //childs
  @ViewChild('circleProgress') circleProgress: ElementRef;

  //util
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;
  public interval : any;

  //input
  public timeToCount : number = 25; //minutes

  //internal properties
  private totalTime : number = this.timeToCount * 60; //time in seconds
  public currentTime : number;
  public displayTime : string;
  public circleNativeElement : any;

  @Input() course : CourseClient;

  constructor(private windowService : WindowResizeService,
    private renderer : Renderer2) { }


  ngAfterViewInit(): void {
    this.initializeTimer();
  }

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

  public initializeTimer(): void {
    this.currentTime = this.totalTime;
    this.setClockInitialState();
  }

  public startTimer(): void {
    this.interval = setInterval(() => {
      this.currentTime--;
      
      this.circleNativeElement = this.circleProgress.nativeElement;
      const radius = this.getRadius();
      const circumference = this.getCircumference(radius);
      const elapsedPercentage = (this.currentTime / this.totalTime) * 100;
      const offset = circumference * (1 - elapsedPercentage / 100);
      this.renderer.setStyle(this.circleNativeElement, 'stroke-dashoffset', `${offset}`);

      this.displayTime = `${Math.floor(this.currentTime / 60)}:${String(this.currentTime % 60).padStart(2, '0')}m`;

      if (this.currentTime === 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  private setClockInitialState(): void {
    this.circleNativeElement = this.circleProgress.nativeElement;
    const radius = this.getRadius();
    const circumference = this.getCircumference(radius);
    this.renderer.setStyle(this.circleNativeElement, 'stroke-dasharray', `${circumference} ${circumference}`);
    const elapsedPercentage = (this.currentTime / this.totalTime) * 100;
    const offset = circumference * (1 - elapsedPercentage / 100);
    this.renderer.setStyle(this.circleNativeElement, 'stroke-dashoffset', `${offset}`);
    this.displayTime = `${Math.floor(this.currentTime / 60)}:${String(this.currentTime % 60).padStart(2, '0')}m`;
  }

  private getRadius(): number {
    return this.circleNativeElement.r.baseVal.value;
  }

  private getCircumference(radius: number): number {
    return radius * 2 * Math.PI;
  }

  private stopTimer(): void {
    clearInterval(this.interval);
  }
}