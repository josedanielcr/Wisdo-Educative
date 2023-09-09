import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';

@Component({
  selector: 'app-study-plan-term-card',
  templateUrl: './study-plan-term-card.component.html',
  styleUrls: ['./study-plan-term-card.component.css']
})
export class StudyPlanTermCardComponent {

  @Input() studyPlanTerm : StudyPlanTermClient;
  @Output() wasCardClicked : EventEmitter<StudyPlanTermClient> = new EventEmitter<StudyPlanTermClient>();

  constructor() { }

  public emitCardWasClicked(): void {
    this.wasCardClicked.emit(this.studyPlanTerm);
  }
}
