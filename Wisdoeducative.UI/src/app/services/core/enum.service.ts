import { Injectable } from '@angular/core';
import { AcademicScheduleEnum } from 'src/app/enums/core/academic.schedule.enum';
import { DegreeTypeEnum } from 'src/app/enums/core/degree.type.enum';
import { StudyFieldEnum } from 'src/app/enums/core/study.field.enum';
import { UserCategoryEnum } from 'src/app/enums/core/user.category.enum';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }

  public getEnumValues(enumType : any): string[]{
    return this.getEnumFields(enumType);
  }

  private getEnumFields(enumType : any): string[] {
    return Object.keys(enumType)
      .filter(key => isNaN(Number(enumType[key])));
  }
}