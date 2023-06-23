import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ChipsContainerComponent } from 'src/app/components/chips-container/chips-container.component';
import { ButtonType } from 'src/app/enums/button.enum';
import { WizardStepDirection } from 'src/app/enums/wizard.enum';
import { ChipModel } from 'src/app/models/chip.model';

@Component({
  selector: 'app-user-interests-setup',
  templateUrl: './user-interests-setup.component.html',
  styleUrls: ['./user-interests-setup.component.css']
})
export class UserInterestsSetupComponent {

    @ViewChild('chipsContainer') chipsContainer : ChipsContainerComponent;
    @Output() event : EventEmitter<any> = new EventEmitter<any>();
    public chips : ChipModel[] = [
        new ChipModel(1,'Sports', false),
        new ChipModel(2,'Music is the real taste of the taste tasty', false),
        new ChipModel(3,'Movies are the best of the paramericuarius', false),
        new ChipModel(4,'TV Shows', false),
        new ChipModel(5,'Books', false),
        new ChipModel(6,'Video Games', false),
        new ChipModel(7,'Board Games', false),
        new ChipModel(8,'Travel', false),
        new ChipModel(9,'Food', false),
        new ChipModel(10,'Fitnessis is the mamado san', false),
        new ChipModel(11,'Outdoors', false),
        new ChipModel(12,'Shopping', false),
        new ChipModel(13,'Cars', false),
        new ChipModel(14,'Politics', false),
        new ChipModel(15,'News', false),
        new ChipModel(16,'Technology', false),
    ];
    public ButtonType = ButtonType;
    public selectedChipsCount : number = 0;

    constructor() { }

    public sendMessageToParent() {
        this.event.emit(WizardStepDirection.NEXT);
    }

    public setSelectedChips(selectedChips : ChipModel[]) : void {
        this.selectedChipsCount = selectedChips.length;
    }
}