import { Component, Input } from '@angular/core';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';

@Component({
  selector: 'app-study-plan-term-card',
  templateUrl: './study-plan-term-card.component.html',
  styleUrls: ['./study-plan-term-card.component.css']
})
export class StudyPlanTermCardComponent {

  @Input() studyPlanTerm : StudyPlanTermClient;
  public readonly months : Map<number, string> = new Map([
    [1, 'January'],
    [2, 'February'],
    [3, 'March'],
    [4, 'April'],
    [5, 'May'],
    [6, 'June'],
    [7, 'July'],
    [8, 'August'],
    [9, 'September'],
    [10, 'October'],
    [11, 'November'],
    [12, 'December']
  ]);

  constructor() { }
}
