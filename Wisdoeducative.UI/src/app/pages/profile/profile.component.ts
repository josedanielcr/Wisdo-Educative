import {Component, OnInit, ViewChild} from '@angular/core';
import {UserInitializationService} from "../../services/helpers/user-initialization.service";
import {Subscription} from "rxjs";
import {UserClient} from "../../models/core/client/user.client.model";
import {ScreenSizeModel} from "../../models/screenSize.model";
import {WindowResizeService} from "../../services/helpers/window-resize.service";
import {ButtonType} from "../../enums/button.enum";
import {UserService} from "../../services/core/models/user.service";
import {MessageService} from "../../services/core/message.service";
import {ApplicationErrorModel} from "../../models/application.error.model";
import {MessageTypeEnum} from "../../enums/message.type.enum";
import {MessageModel} from "../../models/message.model";
import {DialogComponent} from "../../components/dialog/dialog.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //children
  @ViewChild('changeProfileImageDialog') changeProfileImageDialog : DialogComponent;
  @ViewChild('changePersonalInformation') changePersonalInformation : DialogComponent;
  @ViewChild('imageFileInput') inputFile : HTMLInputElement;

  //data
  public user : UserClient;

  //form
  public userDataForm : FormGroup;

  //util
  private subscriptions : Subscription[] = [];
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;
  protected readonly ButtonType = ButtonType;

  constructor(private userInitializationService : UserInitializationService,
              private windowService : WindowResizeService,
              private userService : UserService,
              private messageService : MessageService,
              private fb : FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeUser();
    this.subscribeToWindowService();

  }

  private subscribeToWindowService() {
    this.subscriptions.push(this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    }));
  }

  private initializeUser(): void {
    this.subscriptions.push(this.userInitializationService.initializeUser().subscribe(
      ([user, userDegree, studyPlan, studyPlanTerms]) => {
        this.user = user;
        this.initializeForm();
      }
    ));
  }

  public changeProfileImage() {
    this.changeProfileImageDialog.show();
  }

  public editPersonalInfo() {
    this.changePersonalInformation.show();
  }

  public updateUser(user : UserClient): void {
    this.subscriptions.push(this.userService.updateUser(user).subscribe({
      next : (user : UserClient) => {
        this.user = user;
        this.changeProfileImageDialog.hide();
        this.changePersonalInformation.hide();
      },
      error : (error : ApplicationErrorModel) => {
        this.messageService.show(new MessageModel(MessageTypeEnum.Error, "Error", error.errorCode))
      }
    }));
  }

  public executeUserUpdate() {
    this.user.name = this.userDataForm.get('name').value;
    this.user.lastName = this.userDataForm.get('lastName').value;
    this.updateUser(this.user);
  }

  private initializeForm() {
    this.userDataForm = this.fb.group({
      name : [this.user.name],
      lastName : [this.user.lastName]
    })
  }

  public executeImageUpdate() {

  }
}
