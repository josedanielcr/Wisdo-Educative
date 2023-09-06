import { Component, Input } from '@angular/core';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';

@Component({
  selector: 'app-study-plan-term-grid',
  templateUrl: './study-plan-term-grid.component.html',
  styleUrls: ['./study-plan-term-grid.component.css']
})
export class StudyPlanTermGridComponent {

  @Input() studyPlanTerms : StudyPlanTermClient[] = [];

  constructor() { }
}
