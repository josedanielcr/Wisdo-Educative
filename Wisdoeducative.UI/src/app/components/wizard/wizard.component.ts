import { Component, Input, OnInit } from '@angular/core';
import { WizardStepState } from 'src/app/enums/wizard.enum';
import { WizardChildModel } from 'src/app/models/wizard.child.model';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  
    //Util
    WizardStepState = WizardStepState;

    @Input() steps: WizardChildModel[];
    public currentWizardChildModel: WizardChildModel;
    public currentStep: number = 0;

    constructor() {}

    ngOnInit(): void {
        this.currentWizardChildModel = this.steps[this.currentStep];
    }

    /**
     * This function increments the current step
     */
    public nextStep(): void {
        if(this.currentStep+1 <= this.steps.length) {
            this.currentWizardChildModel = this.steps[this.currentStep];
        }
        this.currentStep++;
    }

    /**
     * moves the current step of a wizard to the previous step if it exists.
     */
    public prevStep(): void {
      if(this.currentStep-1 >= 0) {
        this.currentWizardChildModel = this.steps[this.currentStep];
      }
      this.currentStep--;
    }

    /**
     * Determines the state of a wizard step based on its index in the wizard.
     */
    public isStepActive(index: number): WizardStepState {
        if (index === this.currentStep) {
          return WizardStepState.ACTIVE;
        } else if (index < this.currentStep) {
          return WizardStepState.COMPLETED;
        } else {
          return WizardStepState.UPCOMING;
        }
    }
}