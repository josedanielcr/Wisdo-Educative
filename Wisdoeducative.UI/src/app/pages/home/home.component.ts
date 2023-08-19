import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/enums/button.enum';
import { UserStatus } from 'src/app/enums/core/user.status.enum';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { DegreeService } from 'src/app/services/core/models/degree.service';
import { StudyPlanService } from 'src/app/services/core/models/study-plan.service';
import { UserService } from 'src/app/services/core/models/user.service';
import { StoreService } from 'src/app/services/core/store.service';
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
  private morningGreeting = 'Buenos días';
  private afternoonGreeting = 'Linda tarde';
  private eveningGreeting = 'Buenas noches';

  // properties
  public user : UserClient;
  public userDegrees : UserDegreeClient[];
  public studyPlan : StudyPlanClient;
  
  // util
  public currentTimeOfDay : TimeOfDay;
  public UserStatus = UserStatus;
  public TimeOfDay = TimeOfDay;
  public ButtonType = ButtonType;
  public timeOfDayIcon : string;
  public timeOfDayGreeting : string;
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;

  constructor(private degreeService : DegreeService,
    private windowService : WindowResizeService,
    private studyPlanService : StudyPlanService,
    private router : Router,
    private storeService : StoreService,
    private userService : UserService){}

  ngOnInit(): void {
    this.subscribeToWindowService();
    this.getUser();
    this.setCurrentTimeOfDay();
    this.setTimeOfDayIcon();
  }

  private getUser(): void {
    this.storeService.select('user').subscribe({
      next: (user: UserClient) => {
        this.user = user;
        this.getUserDegrees();
      },
      complete : () => {
        this.userService.validateUser().subscribe({
          next: (user: UserClient) => {
            this.storeService.set('user', user);
            this.user = user;
            this.getUserDegrees();
          }
        });
      }
    });
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
    if(this.user.userStatus === UserStatus.Omitted) this.router.navigate(['/setup']);
    else if (this.user.userStatus !== UserStatus.Omitted 
      && this.userDegrees.length > 0 && !this.studyPlan) this.router.navigate(['workspace/studyPlan']);
  }

  private getUserDegrees(): void {
    this.degreeService.getUserDegrees(this.user.id).subscribe((userDegrees: UserDegreeClient[]) => {
      this.userDegrees = userDegrees;
      this.storeService.set('userDegrees', userDegrees);
      this.getStudyPlan();
    });
  }

  private getStudyPlan(): void {
    this.studyPlanService.getUserStudyPlan(this.userDegrees[0].id).subscribe((studyPlan: StudyPlanClient) => {
      this.studyPlan = studyPlan;
      this.storeService.set('studyPlan', studyPlan);
    });
  }

}