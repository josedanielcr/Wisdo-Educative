import { CourseEvaluationTaskServer } from "./course.evaluation.task.server.model";

export class PomodoroServer {
    id : number;
    courseEvaluationTask : CourseEvaluationTaskServer;
    CourseEvaluationTaskId : number;
    initialTime : Date;
    endTime : Date;
    status : string;

    constructor() {}
}