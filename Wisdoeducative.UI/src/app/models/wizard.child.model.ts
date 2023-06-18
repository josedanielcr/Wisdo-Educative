import { Type } from "@angular/core";
import { ButtonType } from "../enums/button.enum";

export class WizardChildModel {
    public title: string;
    public description: string;
    public nextButtonText: string;
    public nextButtonType : ButtonType;
    public nextButtonWidth : number;
    public nextButtonHeight : number;
    public previousButtonText: string;
    public previousButtonType : ButtonType;
    public previousButtonWidth : number;
    public previousButtonHeight : number;
    public content: Type<any>
  
    constructor(title: string, description: string, nextButtonText: string, 
        nextButtonType : ButtonType, nextButtonWidth : number,
        nextButtonHeight : number, previousButtonText: string, previousButtonType : ButtonType,
        previousButtonWidth : number, previousButtonHeight : number, content: Type<any>) {
      this.title = title;
      this.description = description;
      this.nextButtonText = nextButtonText;
      this.nextButtonType = nextButtonType;
      this.nextButtonWidth = nextButtonWidth;
      this.nextButtonHeight = nextButtonHeight;
      this.previousButtonText = previousButtonText;
      this.previousButtonType = previousButtonType;
      this.previousButtonWidth = previousButtonWidth;
      this.previousButtonHeight = previousButtonHeight;
      this.content = content;
    }
}