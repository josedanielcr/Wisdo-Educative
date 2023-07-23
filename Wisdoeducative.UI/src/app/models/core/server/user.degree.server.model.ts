import { AcademicScheduleEnum } from "src/app/enums/core/academic.schedule.enum";
import { DegreeServer } from "./degree.server.model";
import { InstitutionServer } from "./institution.server.model";
import { UserServer } from "./user.server.model";
import { EntityStatusEnum } from "src/app/enums/core/entity.status.enum";

export class UserDegreeServer {
  degree: DegreeServer | null;
  degreeId: number;
  user: UserServer | null;
  userId: number;
  institution: InstitutionServer | null;
  institutionId: number;
  currentProgress: number;
  startDate: Date;
  endDate: Date;
  schedule: AcademicScheduleEnum;
  status: EntityStatusEnum;

  constructor(
      degree: DegreeServer | null,
      degreeId: number,
      user: UserServer | null,
      userId: number,
      institution: InstitutionServer | null,
      institutionId: number,
      currentProgress: number,
      startDate: Date,
      endDate: Date,
      schedule: AcademicScheduleEnum,
      status: EntityStatusEnum
  ) {
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