import { Component, OnInit } from '@angular/core';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { UserInitializationService } from 'src/app/services/helpers/user-initialization.service';

@Component({
  selector: 'app-study-plan',
  templateUrl: './study-plan.component.html',
  styleUrls: ['./study-plan.component.css']
})
export class StudyPlanComponent implements OnInit {


  //properties
  public user : UserClient;
  public userDegree : UserDegreeClient;
  public studyPlan : StudyPlanClient;
  public studyPlanTerms : StudyPlanTermClient[];

  constructor(private userInitializationService : UserInitializationService) { }

  ngOnInit(): void {
    this.userInitialization();
  }

  private userInitialization(): void {
    this.userInitializationService.initializeUser().subscribe(
      ([user, userDegree, studyPlan, studyPlanTerms]) => {
        this.user = user;
        this.userDegree = userDegree;
        this.studyPlan = studyPlan;
        this.studyPlanTerms = this.setInProgressStudyPlanTerm(studyPlanTerms);
      }
    );
  }

  private setInProgressStudyPlanTerm(studyPlanTerms: StudyPlanTermClient[]): StudyPlanTermClient[] {
    return studyPlanTerms.filter((studyPlanTerm: StudyPlanTermClient) => studyPlanTerm.studyTermStatus = "InProgress");
  }
}