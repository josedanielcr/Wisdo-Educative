import { CourseServer } from "./course.server.model";

export class CourseEvaluationServer {
    id: number;
    courseId: number;
    course: CourseServer;
    name: string;
    description: string;
    weight: string;
    status: string;
    evaluationStatus: string;

    constructor(){}
}
