import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonType } from 'src/app/enums/button.enum';
import { UserStatus } from 'src/app/enums/core/user.status.enum';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { MessageModel } from 'src/app/models/message.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { UserStatistics } from 'src/app/models/utils/user.statistics.model';
import { MessageService } from 'src/app/services/core/message.service';
import { UserStatisticsService } from 'src/app/services/core/models/user-statistics.service';
import { UserInitializationService } from 'src/app/services/helpers/user-initialization.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';
import { ChartData, ChartType } from 'chart.js';
import { TRANSLOCO_SCOPE, TranslocoService } from '@ngneat/transloco';

enum TimeOfDay {
  Morning = 0,
  Afternoon = 1,
  Evening = 2
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  // constants
  private morningPath = '../../../assets/icons/sun 1.svg';
  private afternoonPath = '../../../assets/icons/coffee 1.svg';
  private eveningPath = '../../../assets/icons/moon 1.svg';
  private morningGreeting = 'GoodMorning';
  private afternoonGreeting = 'GoodAfternoon';
  private eveningGreeting = 'GoodEvening';


  // properties
  public user : UserClient;
  public userDegree : UserDegreeClient;
  public studyPlan : StudyPlanClient;
  public studyPlanTerms : StudyPlanTermClient[] = [];
  public userStatistics : UserStatistics;
  
  // util
  public currentTimeOfDay : TimeOfDay;
  public UserStatus = UserStatus;
  public TimeOfDay = TimeOfDay;
  public ButtonType = ButtonType;
  public timeOfDayIcon : string;
  public timeOfDayGreeting : string;
  public loading : boolean = true;

  //screen
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;
  public completed : string;
  public inProgress : string;
  public notStarted : string;

  //subscriptions
  private subscriptions : Subscription[] = [];

  //charts
  public doughnutChart : any;

  constructor(private windowService : WindowResizeService,
    private router : Router,
    private userInitializationService : UserInitializationService,
    private userStatisticsService : UserStatisticsService,
    private messageService : MessageService,
    private translocoService : TranslocoService){}
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.subscribeToTranslations();
    this.subscribeToWindowService();
    this.initializeUser();
    this.setCurrentTimeOfDay();
    this.setTimeOfDayIcon();
  }

  private subscribeToTranslations(): void {
    this.subscriptions.push(
      this.translocoService.selectTranslate('Finished', {}, 'studyplan').subscribe(translation => {
        this.completed = translation;
      }),
      this.translocoService.selectTranslate('InProgress', {}, 'studyplan').subscribe(translation => {
        this.inProgress = translation;
      }),
      this.translocoService.selectTranslate('NotStarted', {}, 'studyplan').subscribe(translation => {
        this.notStarted = translation;
      })
    );
  }

  private getUserStatistics(): void {
    this.subscriptions.push(
      this.userStatisticsService.getUserStatistics(this.user.id).subscribe({
        next : (userStatistics : UserStatistics) => {
          this.userStatistics = userStatistics;
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode));
        }
      })
    )
  }

  public getDougnutData(): ChartData {
    const labels : string[] = [this.completed, this.inProgress, this.notStarted];
    const doughnutChartData : ChartData<'doughnut'> = {
      labels : labels,
      datasets : [
        {
          data : [this.userStatistics.completedCourses, 
            this.userStatistics.inProgressCourses, this.userStatistics.notStartedCourses],
          backgroundColor : ['#1ECF4526', '#256E8E26', '#C2C6CF33']
        }
      ]
    }
    return doughnutChartData;
  }

  public getDougnutType(): ChartType {
    return 'doughnut';
  }


  private initializeUser(): void {
    this.subscriptions.push(this.userInitializationService.initializeUser().subscribe(
      ([user, userDegree, studyPlan, studyPlanTerms]) => {
        this.user = user;
        this.userDegree = userDegree;
        this.studyPlan = studyPlan;
        this.studyPlanTerms = studyPlanTerms;
        this.getUserStatistics();
      }
    ));
  }

  private subscribeToWindowService() {
    this.subscriptions.push(this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    }));
  }

  private setCurrentTimeOfDay(): void {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      this.currentTimeOfDay = TimeOfDay.Morning;
    } else if (currentHour >= 12 && currentHour < 18) {
      this.currentTimeOfDay = TimeOfDay.Afternoon;
    } else {
      this.currentTimeOfDay = TimeOfDay.Evening;
    }
  }

  public setTimeOfDayIcon(): void {
    switch (this.currentTimeOfDay) {
      case TimeOfDay.Morning:
        this.timeOfDayIcon = this.morningPath;
        this.timeOfDayGreeting = this.morningGreeting;
        break;
      case TimeOfDay.Afternoon:
        this.timeOfDayIcon =this.afternoonPath;
        this.timeOfDayGreeting = this.afternoonGreeting;
        break;
      case TimeOfDay.Evening:
        this.timeOfDayIcon = this.eveningPath;
        this.timeOfDayGreeting = this.eveningGreeting;
    }
  }

  public executeSetup(): void {
    if(this.isOmitted()) this.router.navigate(['/setup']);
    else this.router.navigate(['workspace/new-study-plan']);
  }

  public isOmitted(): boolean {
    return (this.user.userStatus === UserStatus.Omitted || !this.userDegree);
  }

  public notCompletedSetup(): boolean {
    return (this.user.userStatus !== UserStatus.Omitted 
      && ((!this.studyPlan) || (this.studyPlan && this.studyPlanTerms.length === 0)))
  }
}