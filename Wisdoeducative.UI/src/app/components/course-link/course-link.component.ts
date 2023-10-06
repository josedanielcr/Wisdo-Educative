import { Component, Input } from '@angular/core';
import { CourseClient } from 'src/app/models/core/client/course.client.model';

@Component({
  selector: 'app-course-link',
  templateUrl: './course-link.component.html',
  styleUrls: ['./course-link.component.css']
})
export class CourseLinkComponent {

  @Input() course: CourseClient;

  constructor() { }
}
