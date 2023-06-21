import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from 'src/app/enums/button.enum';
import { WizardStepDirection } from 'src/app/enums/wizard.enum';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit{

    public userSetupForm : FormGroup;
    public ButtonType = ButtonType;
    @Output() event = new EventEmitter<any>();

    constructor(private fb : FormBuilder) { }

    public ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.userSetupForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            dateOfBirth: [new Date(), [Validators.required]],
            category : ['', [Validators.required]]
        });
    }

    public sendMessageToParent() {
        console.log(this.userSetupForm.controls);
        this.event.emit(WizardStepDirection.NEXT);
    }
}