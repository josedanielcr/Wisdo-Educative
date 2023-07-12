import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ChipsContainerComponent } from 'src/app/components/chips-container/chips-container.component';
import { ButtonType } from 'src/app/enums/button.enum';
import { UserStatus } from 'src/app/enums/core/user.status.enum';
import { WizardStepDirection } from 'src/app/enums/wizard.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { ChipModel } from 'src/app/models/chip.model';
import { InterestClient } from 'src/app/models/core/client/interest.client.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { ChipsContainerService } from 'src/app/services/components/chips-container.service';
import { AuthService } from 'src/app/services/core/auth.service';
import { InterestService } from 'src/app/services/core/interest.service';
import { UserService } from 'src/app/services/core/user.service';

@Component({
  selector: 'app-user-interests-setup',
  templateUrl: './user-interests-setup.component.html',
  styleUrls: ['./user-interests-setup.component.css']
})
export class UserInterestsSetupComponent implements OnInit {

  @ViewChild('chipsContainer') chipsContainer : ChipsContainerComponent;
  @Output() event : EventEmitter<any> = new EventEmitter<any>();
  
  public chips : ChipModel[] = [];
  public interests : InterestClient[] = [];
  public ButtonType = ButtonType;
  public selectedChips : ChipModel[] = [];
  public user : UserClient;

  constructor(private chipsContainerService : ChipsContainerService,
    private interestsService : InterestService,
    private userService : UserService,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.loadUser();
    this.handleChipsContainerService();
    this.loadInterests();
  }

  private loadUser(): void {
    this.authService.getUserSubject().subscribe((user : UserClient) => {
      if(user.userStatus !== UserStatus.PendingInterests) this.event.emit(WizardStepDirection.NEXT);
      this.user = user;
    });
  }

  private loadInterests(): void {
    this.interestsService.getInterests().subscribe({
      next: (interests : InterestClient[]) => {
        if(interests && interests.length > 0){
          this.interests = interests;
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
        this.selectedChips = chips;
      }
    });
  }

  public submitInterests(): void {
    if(this.selectedChips.length < 3){
      alert('Please select at least 3 interests');
      return;
    } 
    this.setupUserInterests();
  }

  private setupUserInterests(): void {
    const interests : InterestClient[] = this.parseChipToInterestClient();
    this.userService.setUserInterests(this.user.id,interests).subscribe({
      next: (user : UserClient) => {
        this.event.emit(WizardStepDirection.NEXT);
      },
      error: (error : ApplicationErrorModel) => {
        alert(error.message);
      }
    });
  }

  private parseChipToInterestClient(): InterestClient[] {
    return this.interests.filter((interest : InterestClient) => {
      return this.selectedChips.some((chip : ChipModel) => {
        return chip.id === interest.id;
      });
    });
  }

}