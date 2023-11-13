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
import { StudyPlanTermGridComponent } from './study-plan-term-grid/study-plan-term-grid.component';
import { StudyPlanTermCardComponent } from './study-plan-term-card/study-plan-term-card.component';
import { StudyPlanTableComponent } from './study-plan-table/study-plan-table.component';
import { MessageComponent } from './message/message.component';
import { MessageContainerComponent } from './message-container/message-container.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TranslationComponent } from './translation/translation.component';
import { TranslocoRootModule } from '../transloco-root.module';
import { CourseStepperComponent } from './course-stepper/course-stepper.component';
import { PomodoroTimerComponent } from './pomodoro-timer/pomodoro-timer.component';
import { EvaluationCalculatorComponent } from './evaluation-calculator/evaluation-calculator.component';
import { InputPercentageComponent } from './input/input-percentage/input-percentage.component';
import { CourseLinkComponent } from './course-link/course-link.component';
import { CourseLinkFiltersComponent } from './course-link-filters/course-link-filters.component';
import { LinkPlatformPickerComponent } from './link-platform-picker/link-platform-picker.component';
import { CourseTaskSelectComponent } from './input/course-task-select/course-task-select.component';
import { CourseLinksTableComponent } from './course-links-table/course-links-table.component';
import { CourseLinkDialogComponent } from './course-link-dialog/course-link-dialog.component';
import { DirectivesModule } from '../directives/directives.module';
import { RemindersComponent } from './reminders/reminders.component';
import { AddReminderComponent } from './add-reminder/add-reminder.component';
import { EvaluationTaskOverviewComponent } from './evaluation-task-overview/evaluation-task-overview.component';
import { CompleteEvaluationTaskComponent } from './complete-evaluation-task/complete-evaluation-task.component';
import { GradesComponent } from './grades/grades.component';

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
    StudyPlanTermGridComponent,
    StudyPlanTermCardComponent,
    StudyPlanTableComponent,
    MessageComponent,
    MessageContainerComponent,
    SpinnerComponent,
    StudyPlanFiltersComponent,
    TranslationComponent,
    CourseStepperComponent,
    PomodoroTimerComponent,
    EvaluationCalculatorComponent,
    InputPercentageComponent,
    CourseLinkComponent,
    CourseLinkFiltersComponent,
    LinkPlatformPickerComponent,
    CourseTaskSelectComponent,
    CourseLinksTableComponent,
    CourseLinkDialogComponent,
    RemindersComponent,
    AddReminderComponent,
    EvaluationTaskOverviewComponent,
    CompleteEvaluationTaskComponent,
    GradesComponent
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
    StudyPlanTermGridComponent,
    StudyPlanTermCardComponent,
    StudyPlanTableComponent,
    ProgressBarComponent,
    MessageComponent,
    MessageContainerComponent,
    SpinnerComponent,
    StudyPlanFiltersComponent,
    TranslationComponent,
    CourseStepperComponent,
    PomodoroTimerComponent,
    EvaluationCalculatorComponent,
    InputPercentageComponent,
    CourseLinkComponent,
    CourseLinksTableComponent,
    CourseLinkDialogComponent,
    RemindersComponent,
    AddReminderComponent,
    EvaluationTaskOverviewComponent,
    CompleteEvaluationTaskComponent,
    GradesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoRootModule,
    DirectivesModule
  ]
})
export class ComponentsModule { }
