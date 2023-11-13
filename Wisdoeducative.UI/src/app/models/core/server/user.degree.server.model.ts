import { AcademicScheduleEnum } from "src/app/enums/core/academic.schedule.enum";
import { DegreeServer } from "./degree.server.model";
import { InstitutionServer } from "./institution.server.model";
import { UserServer } from "./user.server.model";
import { EntityStatusEnum } from "src/app/enums/core/entity.status.enum";

export class UserDegreeServer {
  id: number;
  degree: DegreeServer | null;
  degreeId: number;
  user: UserServer | null;
  userId: number;
  institution: InstitutionServer | null;
  institutionId: number;
  currentProgress: number;
  startDate: Date;
  endDate: Date;
  isDefault : boolean | null;
  schedule: AcademicScheduleEnum;
  status: EntityStatusEnum;

  constructor(){}
}
