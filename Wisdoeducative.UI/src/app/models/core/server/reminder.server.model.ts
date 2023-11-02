import {CourseEvaluationTaskServer} from "./course.evaluation.task.server.model";

export class ReminderServer {
  id : number;
  name : string;
  courseEvaluationTaskId : number;
  courseEvaluationTask : CourseEvaluationTaskServer;
  date : Date;
  status : string;
  isCompleted : boolean;
}
