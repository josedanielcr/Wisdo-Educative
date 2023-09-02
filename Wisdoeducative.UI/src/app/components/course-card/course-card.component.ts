import { Component, Input } from '@angular/core';
import { CourseClient } from 'src/app/models/core/client/course.client.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {

  @Input() course: CourseClient;

  constructor() { }

  public getCoursesProgress(): number {
    try {
      return Number(this.course.currentScore);
    } catch (error) {
      return 0;
    }
  }
}