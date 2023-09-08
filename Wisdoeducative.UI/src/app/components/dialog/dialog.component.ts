import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogType } from 'src/app/enums/dialog.type.enum';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { StudyTermCoursesModel } from 'src/app/models/utils/study.term.courses.model';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  //input
  @Input() public title: string = '';
  @Input() public minHeight : number = 30;
  @Input() public type : DialogType = DialogType.Default;
  @Input() public newStudyPlanTerm : StudyTermCoursesModel = null;
  @Input() public canBeClosed : boolean = true;

  //output
  @Output() public wasClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  //util
  public DialogType = DialogType;
  public isVisible: boolean = false;
  public isDesktop: boolean = false;
  public isTablet: boolean = false;
  public isPhone: boolean = false;

  
  constructor(private windowService : WindowResizeService,
    private cdr : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscribeToWindowService();
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  public show(): void {
    this.isVisible = true;
    this.cdr.detectChanges();
  }

  public hide(): void {
    this.isVisible = false;
  }

  public toggle(): void {
    this.isVisible = !this.isVisible;
    if(!this.isVisible) {
      this.wasClosed.emit(true);
    }
  }
}