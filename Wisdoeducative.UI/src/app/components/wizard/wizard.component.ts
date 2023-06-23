import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { WizardStepDirection, WizardStepState } from 'src/app/enums/wizard.enum';
import { WizardChildModel } from 'src/app/models/wizard.child.model';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  
    @Input() steps: WizardChildModel[];
    @Input() width: number;
    @ViewChild('componentContainer', { read: ViewContainerRef }) container: ViewContainerRef;
    
    public currentWizardChildModel: WizardChildModel;
    public currentStep: number = 0;
    public WizardStepState = WizardStepState;

    constructor(private viewContainerRef: ViewContainerRef) {}

    ngOnInit(): void {
        this.currentWizardChildModel = this.steps[this.currentStep];
        this.loadComponent();
    }

    /**
     * Creates a component.
     */
    public loadComponent(): void {
        
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef
            .createComponent(this.currentWizardChildModel.content);
        
        componentRef.instance.event.subscribe((event) => {
            this.handleChildEvent(event);
        });
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

    /**
     * This function handles the event of moving to the next or previous step in a wizard and updates the
     * current step and model accordingly.
     * @param {WizardStepDirection} direction
     */
    private handleChildEvent(direction : WizardStepDirection): void {
        console.log(direction);
        if (direction === WizardStepDirection.NEXT && this.currentStep < this.steps.length - 1) {
            this.currentStep++;
        } else if (direction === WizardStepDirection.PREVIOUS && this.currentStep > 0) {
            this.currentStep--;
        }

        this.currentWizardChildModel = this.steps[this.currentStep];
        this.loadComponent();
    }
}