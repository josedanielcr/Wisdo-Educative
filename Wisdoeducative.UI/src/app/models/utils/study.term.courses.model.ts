import { CourseClient } from "../core/client/course.client.model";
import { StudyPlanTermClient } from "../core/client/study.plan.term.client.model";

export class StudyTermCoursesModel {
  studyPlanTermDto: StudyPlanTermClient;
  coursesDtos: CourseClient[];

  constructor() {}
}