import { AcademicScheduleEnum } from "src/app/enums/core/academic.schedule.enum";
import { DegreeTypeEnum } from "src/app/enums/core/degree.type.enum";
import { StudyFieldEnum } from "src/app/enums/core/study.field.enum";

export class SetUpDegree {
  public userId : string;
  public degreeName: string;
  public InstitutionName: string;
  public schedule: AcademicScheduleEnum;
  public degreeType: DegreeTypeEnum;
  public StudyField: StudyFieldEnum;
  public startYear: Date;

  constructor() {}
}