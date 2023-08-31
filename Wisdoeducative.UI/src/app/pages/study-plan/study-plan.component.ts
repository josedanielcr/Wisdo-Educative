import { Component, OnInit } from '@angular/core';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { CourseService } from 'src/app/services/core/models/course.service';
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
  public defaultStudyPlanTerm : StudyPlanTermClient;
  public defaultStudyPlanTemCourses : CourseClient[];

  constructor(private userInitializationService : UserInitializationService,
    private courseService : CourseService) { }

  ngOnInit(): void {
    this.userInitialization();
  }

  private userInitialization(): void {
    this.userInitializationService.initializeUser().subscribe(
      ([user, userDegree, studyPlan, studyPlanTerms]) => {
        this.user = user;
        this.userDegree = userDegree;
        this.studyPlan = studyPlan;
        this.studyPlanTerms = studyPlanTerms;
        this.defaultStudyPlanTerm = this.setInProgressStudyPlanTerm(studyPlanTerms);
        this.setDefaultStudyPlanTermCourses(this.defaultStudyPlanTerm.id);
      }
    );
  }

  private setInProgressStudyPlanTerm(studyPlanTerms: StudyPlanTermClient[]): StudyPlanTermClient {
    return studyPlanTerms.filter((studyPlanTerm: StudyPlanTermClient) => studyPlanTerm.studyTermStatus = "InProgress")[0];
  }

  private setDefaultStudyPlanTermCourses(id: number): void  {
    this.courseService.getStudyPlanTermCourses(id).subscribe({
      next : (courses : CourseClient[]) => {
        this.defaultStudyPlanTemCourses = courses; 
      },
      error : (err : ApplicationErrorModel) => {
        console.log(err);
      }
    })
  }

  public filterCourses(courses : CourseClient[]){
    this.defaultStudyPlanTemCourses = courses;
  }

  public switchView(isCardView : boolean): void {
  }
}