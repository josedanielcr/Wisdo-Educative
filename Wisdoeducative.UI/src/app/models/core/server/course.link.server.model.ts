import { CourseEvaluationTaskServer } from "./course.evaluation.task.server.model";
import { CourseServer } from "./course.server.model";

export class CourseLinkServer {
    id : number;
    courseEvaluationTask : CourseEvaluationTaskServer;
    courseEvaluationTaskId : number;
    link : string;
    name : string;
    platform : string;
    status : string;

    constructor(){}
}