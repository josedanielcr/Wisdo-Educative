import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { CourseEvaluationTaskClient } from 'src/app/models/core/client/course.evaluation.task.client.model';
import { MessageModel } from 'src/app/models/message.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { MessageService } from 'src/app/services/core/message.service';
import { CourseEvaluationService } from 'src/app/services/core/models/course-evaluation.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';
import { CourseTaskSelectComponent } from '../input/course-task-select/course-task-select.component';
import { PomodoroServer } from 'src/app/models/core/server/pomodoro.server';
import { PomodoroService } from 'src/app/services/core/models/pomodoro.service';
import { PomodoroClient } from 'src/app/models/core/client/pomodoro.client';

@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.css']
})
export class PomodoroTimerComponent implements OnInit, AfterViewInit, OnDestroy {

  //childs
  @ViewChild('circleProgress') circleProgress: ElementRef;
  @ViewChild(CourseTaskSelectComponent) taskSelect : CourseTaskSelectComponent;

  //util
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;
  public interval : any;
  public isRunning : boolean = false;
  public isResting : boolean = false;
  public subscriptions : Subscription[] = [];

  //input
  public timeToCount : number = 25; //minutes

  //internal properties
  private totalTime : number = this.timeToCount * 60; //time in seconds
  private totalTimeAux : number = this.timeToCount * 60; //time in seconds
  public currentTime : number;
  public displayTime : string;
  public circleNativeElement : any;
  public pomodoroTotalRound : boolean[] = [false,false,false,false];
  public pomodoroRestingSessions : number[] = [5,5,5,15];
  public currPomodoroRound : number = -1;
  public finalTime : Date;

  //data
  @Input() course : CourseClient;
  public tasks : CourseEvaluationTaskClient[] = [];
  public selectedTask : CourseEvaluationTaskClient;
  public currentPomodoro : PomodoroClient;

  //form
  public form : FormGroup;

  constructor(private windowService : WindowResizeService,
    private renderer : Renderer2,
    private cdr : ChangeDetectorRef,
    private fb : FormBuilder,
    private evaluationService : CourseEvaluationService,
    private messageService : MessageService,
    private pomodoroService : PomodoroService) { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.initializeTimer();
  }

  ngOnInit(): void {
    this.subscribeToWindowService();
    this.form = this.fb.group({
      task : ['']
    });
    this.getCourseEvaluationTasks();
  }

  private getCourseEvaluationTasks(): void {
    this.subscriptions.push(
      this.evaluationService.getCourseTasks(this.course.id).subscribe({
        next: (tasks : CourseEvaluationTaskClient[]) => {
          this.tasks = tasks;
        },
        error: (err : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', err.errorCode));
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if(this.currentPomodoro){
      this.pomodoroService.createPomodoroSession(this.currentPomodoro);
    }
  }

  public runPomodoro() : void {
    if(!this.selectedTask) return;
    this.isRunning = true;
    this.startTimer();
  }

  public stopTimer(): void {
    this.managePostPomodoroSession();
    this.isRunning = false;
    this.managerPomodoroRounds();
  }

  private managerPomodoroRounds(): void  {
    clearInterval(this.interval);
    this.manageRestTime();
  }

  private manageRestTime(): void {
    if(!this.isResting) {
      this.pomodoroTotalRound[this.currPomodoroRound+1] = true;
      this.currPomodoroRound++;
      this.isResting = true;
      this.initializeTimer(this.pomodoroRestingSessions[this.currPomodoroRound] * 60);
    } else {
      if(this.currPomodoroRound+1 === 4) {
        this.currPomodoroRound = -1;
        this.pomodoroTotalRound = [false,false,false,false];
      }
      this.isResting = false;
      this.initializeTimer();
    }
  }

  public onTaskChange(taskName : string) : void {
    if(this.isRunning) {
      this.taskSelect.value = this.selectedTask.name;
      this.taskSelect.isActive = false;
      return;
    }
    this.selectedTask = this.tasks.find(t => t.name.toUpperCase() === taskName.toUpperCase());
    if(!this.selectedTask) return;
    this.isRunning = true;
    this.startTimer();
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  public initializeTimer(time? : number): void {
    if(time) {
      this.currentTime = time;
      this.totalTimeAux = time;
    }
    else {
      this.currentTime = this.totalTime;
      this.totalTimeAux = this.totalTime;
    }

    this.setClockInitialState();
  }

  public startTimer(): void {
    this.setCurrentPomodoro();
    this.interval = setInterval(() => {
      this.currentTime--;

      this.circleNativeElement = this.circleProgress.nativeElement;
      const radius = this.getRadius();
      const circumference = this.getCircumference(radius);
      const elapsedPercentage = (this.currentTime / this.totalTimeAux) * 100;
      const offset = circumference * (1 - elapsedPercentage / 100);
      this.renderer.setStyle(this.circleNativeElement, 'stroke-dashoffset', `${offset}`);

      this.displayTime = `${Math.floor(this.currentTime / 60)}:${String(this.currentTime % 60).padStart(2, '0')}m`;

      if (this.currentTime === 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  private setCurrentPomodoro(): void {
    this.currentPomodoro = new PomodoroClient();
    this.currentPomodoro.CourseEvaluationTaskId = this.selectedTask.id;
    this.currentPomodoro.initialTime = new Date();
  }

  private managePostPomodoroSession(): void {
    this.currentPomodoro.endTime = new Date();
    if(this.isResting) return;
    this.pomodoroService.createPomodoroSession(this.currentPomodoro).subscribe({
      next : () => {
        return;
      },
      error : (err : ApplicationErrorModel) => {
        this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', err.errorCode));
      }
    });
  }

  private setClockInitialState(): void {
    this.circleNativeElement = this.circleProgress.nativeElement;
    const radius = this.getRadius();
    const circumference = this.getCircumference(radius);
    this.renderer.setStyle(this.circleNativeElement, 'stroke-dasharray', `${circumference} ${circumference}`);
    const elapsedPercentage = (this.currentTime / this.totalTimeAux) * 100;
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
}
