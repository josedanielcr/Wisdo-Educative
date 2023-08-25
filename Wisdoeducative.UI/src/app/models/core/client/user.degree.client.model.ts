import { AcademicScheduleEnum } from "src/app/enums/core/academic.schedule.enum";
import { DegreeClient } from "./degree.client.model";
import { InstitutionClient } from "./institution.client.model";
import { UserClient } from "./user.client.model";
import { EntityStatusEnum } from "src/app/enums/core/entity.status.enum";

export class UserDegreeClient {
  id: number;
  degree: DegreeClient | null;
  degreeId: number;
  user: UserClient | null;
  userId: number;
  institution: InstitutionClient | null;
  institutionId: number;
  currentProgress: number;
  startDate: Date;
  endDate: Date;
  schedule: AcademicScheduleEnum;
  status: EntityStatusEnum;

  constructor(){}
}
