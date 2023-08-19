import { Component, OnInit } from '@angular/core';
import { ButtonType } from 'src/app/enums/button.enum';
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
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-study-plan',
  templateUrl: './study-plan.component.html',
  styleUrls: ['./study-plan.component.css']
})
export class StudyPlanComponent implements OnInit {

  public user : UserClient;
  public userDegree : UserDegreeClient;
  public studyPlan : StudyPlanClient;
  public studyPlanTerms : StudyPlanTermClient[] = [];
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;
  public ButtonType = ButtonType;

  constructor(private storeService : StoreService,
    private userService : UserService,
    private degreeService : DegreeService,
    private studyPlanService : StudyPlanService,
    private windowService : WindowResizeService) { }

  ngOnInit(): void {
    this.manageUserData();
    this.subscribeToWindowService();
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  private manageUserData(): void {
    this.storeService.select('user').subscribe({
      next: (user: UserClient) => {
        this.user = user;
        this.getUserDegrees();
      },
      complete: () => {
        this.userService.validateUser().subscribe({
          next: (user: UserClient) => {
            this.storeService.set('user', user);
            this.user = user;
            this.getUserDegrees();
          },
          error: (err : ApplicationErrorModel) => {
            console.log(err);
          }
        });
      }
    });
  }

  private getUserDegrees() {
    this.storeService.select('userDegrees').subscribe({
      next: (userDegrees: UserDegreeClient[]) => {
        this.userDegree = userDegrees[0];
        this.getStudyPlan();
      },
      complete: () => {
        this.degreeService.getUserDegrees(this.user.id).subscribe({
          next: (userDegrees: UserDegreeClient[]) => {
            this.storeService.set('userDegrees', userDegrees);
            this.userDegree = userDegrees[0];
            this.getStudyPlan();
          },
          error: (err : ApplicationErrorModel) => {
            console.log(err);
          }
        });
      }
    });
  }

  private getStudyPlan(): void {
    this.storeService.select('studyPlan').subscribe({
      next: (studyPlan: StudyPlanClient) => {
        this.studyPlan = studyPlan;
      },
      complete: () => {
        this.studyPlanService.getUserStudyPlan(this.userDegree.id).subscribe({
          next: (studyPlan: StudyPlanClient) => {
            this.storeService.set('studyPlan', studyPlan);
            this.studyPlan = studyPlan;
          },
          error: (err : ApplicationErrorModel) => {
            console.log(err);
          }
        });
      }
    });
  }

  public createStudyPlan() : void {
    let studyPlan : StudyPlanClient = 
      new StudyPlanClient(null,this.userDegree.id,null,null,null,null,null,null);
    this.studyPlanService.createStudyPlan(studyPlan).subscribe({
      next: (studyPlan: StudyPlanClient) => {
        this.storeService.set('studyPlan', studyPlan);
        this.studyPlan = studyPlan;
        this.createStudyTerm();
      },
      error: (err : ApplicationErrorModel) => {
        console.log(err);
      }
    });
  }

  private createStudyTerm(): void {
    let studyPlanTerm : StudyPlanTermClient = new StudyPlanTermClient(null,this.studyPlan.id,null,null,null,null);
    this.studyPlanService.createStudyPlanTerm(studyPlanTerm).subscribe({
      next: (studyPlan: StudyPlanTermClient) => {
        this.studyPlanTerms.push(studyPlan);
        this.storeService.set('studyPlanTerms', this.studyPlanTerms);
        console.log(this.studyPlanTerms);
      },
      error: (err : ApplicationErrorModel) => {
        console.log(err);
      }
    });
  }
}