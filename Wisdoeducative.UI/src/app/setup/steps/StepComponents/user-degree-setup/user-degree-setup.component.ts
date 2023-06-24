import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from 'src/app/enums/button.enum';
import { SetUpDegree } from 'src/app/models/utils/setupDegree.model';
import { FormService } from 'src/app/services/components/form.service';

@Component({
  selector: 'app-user-degree-setup',
  templateUrl: './user-degree-setup.component.html',
  styleUrls: ['./user-degree-setup.component.css']
})
export class UserDegreeSetupComponent implements OnInit{

  public setupDegreFormm : FormGroup;
  public ButtonType = ButtonType;

  constructor(private fb : FormBuilder, private formService : FormService) {}

  public ngOnInit(): void {
    this.createForm();  
  }

  public createForm(): void {
    this.setupDegreFormm = this.fb.group({
      degreeName: ['', Validators.required],
      institution: ['', Validators.required],
      schedule: ['', Validators.required],
      degreeType: ['', Validators.required],
      field : ['', Validators.required],
      startYear: [new Date(), Validators.required],
    });  
  }

  public submit(): void {
    const setupDegreeData : SetUpDegree | null = 
      this.formService.validateForm(this.setupDegreFormm, SetUpDegree);
    if(!setupDegreeData) alert('Invalid form data');
  }
}