import { Component, EventEmitter, Output } from '@angular/core';
import { WizardStepDirection } from 'src/app/enums/wizard.enum';

@Component({
  selector: 'app-user-interests-setup',
  templateUrl: './user-interests-setup.component.html',
  styleUrls: ['./user-interests-setup.component.css']
})
export class UserInterestsSetupComponent {

    @Output() event : EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    public sendMessageToParent() {
        this.event.emit(WizardStepDirection.PREVIOUS);
    }
}
