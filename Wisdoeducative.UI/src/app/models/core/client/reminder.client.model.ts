import {CourseEvaluationTaskClient} from "./course.evaluation.task.client.model";

export class ReminderClient {
  id : number;
  name : string;
  courseEvaluationTaskId : number;
  courseEvaluationTask : CourseEvaluationTaskClient;
  date : Date;
  status : string;
  isCompleted : boolean;
}
