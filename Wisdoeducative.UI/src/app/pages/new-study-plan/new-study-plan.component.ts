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
import { UserInitializationService } from 'src/app/services/helpers/user-initialization.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-mew-study-plan',
  templateUrl: './new-study-plan.component.html',
  styleUrls: ['./new-study-plan.component.css']
})
export class NewStudyPlanComponent implements OnInit {

  //properties
  public user : UserClient;
  public userDegree : UserDegreeClient;
  public studyPlan : StudyPlanClient;
  public studyPlanTerms : StudyPlanTermClient[] = [];

  //utils
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;
  public ButtonType = ButtonType;
  public isNewStudyPlanTermOpen : boolean = false;

  constructor(private storeService : StoreService,
    private studyPlanService : StudyPlanService,
    private windowService : WindowResizeService,
    private userInitializationService : UserInitializationService) { }

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

  private manageUserData() {
    this.userInitializationService.initializeUser().subscribe({
      next : ([user, userDegree, studyPlan, studyPlanTerms]) => {
        this.user = user;
        this.userDegree = userDegree;
        this.studyPlan = studyPlan;
        this.studyPlanTerms = studyPlanTerms;
      },
      error : (err : any) => {
        console.log(err);
      }
    })
  }

  public createStudyPlan(): void {
    let studyPlan: StudyPlanClient = new StudyPlanClient();
  
    studyPlan.id = null;
    studyPlan.userDegreeId = this.userDegree.id;
    studyPlan.userDegree = null;
    studyPlan.gradingSystemId = null;
    studyPlan.gradingSystem = null;
    studyPlan.totalCredits = null;
    studyPlan.earnedCredits = null;
    studyPlan.status = null;
  
    this.studyPlanService.createStudyPlan(studyPlan).subscribe({
      next: (studyPlan: StudyPlanClient) => {
        this.storeService.set('studyPlan', studyPlan);
        this.studyPlan = studyPlan;
        this.isNewStudyPlanTermOpen = true;
      },
      error: (err: ApplicationErrorModel) => {
        console.log(err);
      }
    });
  } 

  public openDialog() : void {
    this.isNewStudyPlanTermOpen = true;
  }
}