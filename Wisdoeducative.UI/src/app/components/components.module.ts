import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputTextComponent } from './input/input-text/input-text.component';
import { InputSelectComponent } from './input/input-select/input-select.component';
import { InputDateComponent } from './input/input-date/input-date.component';
import { ChipsContainerComponent } from './chips-container/chips-container.component';
import { ChipComponent } from './chips-container/chip/chip.component';
import { InstitutionSelectComponent } from './input/institution-select/institution-select.component';
import { DialogComponent } from './dialog/dialog.component';
import AddStudyPlanTermComponent from './add-study-plan-term/add-study-plan-term.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseGridComponent } from './course-grid/course-grid.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { StudyPlanFiltersComponent } from './study-plan-filters/study-plan-filters.component';
import { TranslationComponent } from './translation/translation.component';
import { TranslocoRootModule } from '../transloco-root.module';



@NgModule({
  declarations: [
    ButtonComponent,
    InputTextComponent,
    InputSelectComponent,
    InputDateComponent,
    ChipsContainerComponent,
    ChipComponent,
    InstitutionSelectComponent,
    DialogComponent,
    AddStudyPlanTermComponent,
    CourseGridComponent,
    CourseCardComponent,
    ProgressBarComponent,
    StudyPlanFiltersComponent,
    TranslationComponent
  ],
  exports: [
    ButtonComponent,
    InputTextComponent,
    InputSelectComponent,
    InputDateComponent,
    ChipsContainerComponent,
    InstitutionSelectComponent,
    DialogComponent,
    AddStudyPlanTermComponent,
    CourseCardComponent,
    CourseGridComponent,
    StudyPlanFiltersComponent,
    TranslationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoRootModule
  ]
})
export class ComponentsModule { }