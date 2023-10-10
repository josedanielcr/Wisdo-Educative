import { CourseClient } from "./course.client.model";
import { CourseEvaluationTaskClient } from "./course.evaluation.task.client.model";

export class CourseEvaluationClient {
    id: number;
    courseId: number;
    course: CourseClient;
    tasks : CourseEvaluationTaskClient[];
    name: string;
    description: string;
    weight: string;
    status: string;

    constructor(){}
}