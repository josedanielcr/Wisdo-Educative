import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ChipsContainerComponent } from 'src/app/components/chips-container/chips-container.component';
import { ButtonType } from 'src/app/enums/button.enum';
import { WizardStepDirection } from 'src/app/enums/wizard.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { ChipModel } from 'src/app/models/chip.model';
import { InterestClient } from 'src/app/models/core/client/interest.client.model';
import { ChipsContainerService } from 'src/app/services/components/chips-container.service';
import { InterestService } from 'src/app/services/core/interest.service';

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

  constructor(private chipsContainerService : ChipsContainerService,
    private interestsService : InterestService) { }

  ngOnInit(): void {
    this.handleChipsContainerService();
    this.loadInterests();
  }

  private loadInterests(): void {
    this.interestsService.getInterests().subscribe({
      next: (interests : InterestClient[]) => {
        if(interests && interests.length > 0){
          this.chips = interests.map((interest : InterestClient) => {
            return new ChipModel(interest.id, interest.name, false);
          });
        }
      },
      error: (error : ApplicationErrorModel) => {
        alert(error.message);
      }
    });
  }

  private handleChipsContainerService(): void {
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