import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {AddReminderComponent} from "../../components/add-reminder/add-reminder.component";

@Component({
  selector: 'app-course-evaluation-tasks',
  templateUrl: './course-evaluation-tasks.component.html',
  styleUrls: ['./course-evaluation-tasks.component.css']
})
export class CourseEvaluationTasksComponent implements OnInit{

  public courseEvaluationTaskId : number;
  @ViewChild(AddReminderComponent) addReminderComponent : AddReminderComponent;
  //util
  private subscriptions : Subscription[] = [];

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to the route parameters
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.courseEvaluationTaskId = params['taskId'];
      })
    );
  }

  public openAddReminder(): void {
    this.addReminderComponent.openDialog();
  }
}
