import { Component, Input, OnInit } from '@angular/core';
import { CourseClient } from 'src/app/models/core/client/course.client.model';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent  {

  @Input() courses: CourseClient[];

  constructor() { }
}
