import { CourseClient } from "./course.client.model";
import { CourseEvaluationTaskClient } from "./course.evaluation.task.client.model";

export class CourseLinkClient {
    id : number;
    courseEvaluationTask : CourseEvaluationTaskClient;
    courseEvaluationTaskId : number;
    link : string;
    name : string;
    platform : string;
    status : string;

    constructor(){}
}