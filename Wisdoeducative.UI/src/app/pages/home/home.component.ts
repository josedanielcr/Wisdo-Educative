import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/enums/button.enum';
import { UserStatus } from 'src/app/enums/core/user.status.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { DegreeService } from 'src/app/services/core/models/degree.service';
import { StudyPlanService } from 'src/app/services/core/models/study-plan.service';
import { UserService } from 'src/app/services/core/models/user.service';
import { StoreService } from 'src/app/services/core/store.service';
import { UserInitializationService } from 'src/app/services/helpers/user-initialization.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

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
export class HomeComponent implements OnInit {
  
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

  constructor(private windowService : WindowResizeService,
    private router : Router,
    private userInitializationService : UserInitializationService){}

  ngOnInit(): void {
    this.subscribeToWindowService();
    this.initializeUser();
    this.setCurrentTimeOfDay();
    this.setTimeOfDayIcon();
  }


  private initializeUser(): void {
    this.userInitializationService.initializeUser().subscribe(
      ([user, userDegree, studyPlan, studyPlanTerms]) => {
        this.user = user;
        this.userDegree = userDegree;
        this.studyPlan = studyPlan;
        this.studyPlanTerms = studyPlanTerms;
      }
    );
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
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