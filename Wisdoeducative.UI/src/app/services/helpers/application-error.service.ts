import { Injectable } from '@angular/core';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { MessageService } from '../core/message.service';
import { MessageModel } from 'src/app/models/message.model';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';

@Injectable({
  providedIn: 'root'
})
export class ApplicationErrorService {

  private readonly DEFAULT_ERROR_MESSAGE : string = 'Something went wrong!';

  constructor(private messageService : MessageService) { }

  public parseHttpError(error : any): ApplicationErrorModel {
    const errorData = error.error;
    const erorr : ApplicationErrorModel = new ApplicationErrorModel(errorData.error,errorData.statusCode);
    this.showErrorMessage(erorr);
    return erorr;
  }

  public showErrorMessage(error : ApplicationErrorModel): void {
    const message : MessageModel = new MessageModel(MessageTypeEnum.Error,this.DEFAULT_ERROR_MESSAGE,error.message);
    this.messageService.show(message);
  }
}
