import { CourseEvaluationTaskServer } from "./course.evaluation.task.server.model";
import { CourseServer } from "./course.server.model";

export class CourseEvaluationServer {
    id: number;
    courseId: number;
    course: CourseServer;
    tasks : CourseEvaluationTaskServer[];
    name: string;
    description: string;
    weight: string;
    status: string;

    constructor(){}
}
