import { CourseEvaluationTaskClient } from "./course.evaluation.task.client.model";

export class PomodoroClient {
    id : number;
    courseEvaluationTask : CourseEvaluationTaskClient;
    CourseEvaluationTaskId : number;
    initialTime : Date;
    endTime : Date;
    status : string;

    constructor() {}
}