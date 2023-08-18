import { AcademicScheduleEnum } from "src/app/enums/core/academic.schedule.enum";
import { DegreeClient } from "./degree.client.model";
import { InstitutionClient } from "./institution.client.model";
import { UserClient } from "./user.client.model";
import { EntityStatusEnum } from "src/app/enums/core/entity.status.enum";

export class UserDegreeClient {
  id : number;
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

  constructor(
      id : number,
      degree: DegreeClient | null,
      degreeId: number,
      user: UserClient | null,
      userId: number,
      institution: InstitutionClient | null,
      institutionId: number,
      currentProgress: number,
      startDate: Date,
      endDate: Date,
      schedule: AcademicScheduleEnum,
      status: EntityStatusEnum
  ) {
      this.id = id;
      this.degree = degree;
      this.degreeId = degreeId;
      this.user = user;
      this.userId = userId;
      this.institution = institution;
      this.institutionId = institutionId;
      this.currentProgress = currentProgress;
      this.startDate = startDate;
      this.endDate = endDate;
      this.schedule = schedule;
      this.status = status;
  }
}