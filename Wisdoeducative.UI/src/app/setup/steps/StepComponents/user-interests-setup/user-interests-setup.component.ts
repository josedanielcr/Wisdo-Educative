import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ChipsContainerComponent } from 'src/app/components/chips-container/chips-container.component';
import { ButtonType } from 'src/app/enums/button.enum';
import { WizardStepDirection } from 'src/app/enums/wizard.enum';
import { ChipModel } from 'src/app/models/chip.model';
import { ChipsContainerService } from 'src/app/services/components/chips-container.service';

@Component({
  selector: 'app-user-interests-setup',
  templateUrl: './user-interests-setup.component.html',
  styleUrls: ['./user-interests-setup.component.css']
})
export class UserInterestsSetupComponent implements OnInit {

  @ViewChild('chipsContainer') chipsContainer : ChipsContainerComponent;
  @Output() event : EventEmitter<any> = new EventEmitter<any>();
  
  public chips : ChipModel[] = [];
  public ButtonType = ButtonType;
  public selectedChipsCount : number = 0;

  constructor(private chipsContainerService : ChipsContainerService) { }

  ngOnInit(): void {
    this.chipsContainerService.getVariableSubject().subscribe((chips : ChipModel[]) => {
      if(chips && chips.length > 0){
        this.selectedChipsCount = chips.length;
      }
    });
  }

  public sendMessageToParent() {
    this.event.emit(WizardStepDirection.NEXT);
  }

}