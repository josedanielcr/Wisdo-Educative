import { Component, OnInit } from '@angular/core';
import { WizardChildModel } from 'src/app/models/wizard.child.model';
import { UserSetupComponent } from './StepComponents/user-setup/user-setup.component';
import { UserInterestsSetupComponent } from './StepComponents/user-interests-setup/user-interests-setup.component';
import { UserDegreeSetupComponent } from './StepComponents/user-degree-setup/user-degree-setup.component';
import { ButtonType } from 'src/app/enums/button.enum';
import { AuthService } from 'src/app/services/core/auth.service';
import { UserStatus } from 'src/app/enums/core/user.status.enum';
import { Router } from '@angular/router';
import { UserClient } from 'src/app/models/core/client/user.client.model';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent {
    
    public wizardsChildSteps : WizardChildModel[];

    constructor() {
        this.setupSteps();
    }

    private setupSteps(): void {
        this.wizardsChildSteps = [
            new WizardChildModel('Personal',
             'We can personalize your experience within the tool with your personal information', 
             'Continue', ButtonType.BONE, 225, 47, null, null, null, null, UserSetupComponent),
            new WizardChildModel('Interests','Tell us what your professional interests are',
             'Continue', ButtonType.BONE, 225, 47, null, null, null, null,
              UserInterestsSetupComponent),
            new WizardChildModel('Studies','Tell us about the career, course you are currently studying or have studied',
             'Continue', ButtonType.BONE, 225, 47, null, null, null, null, 
             UserDegreeSetupComponent),
        ];
    }
}