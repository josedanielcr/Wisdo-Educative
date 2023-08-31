import { CourseClient } from "./course.client.model";

export class CourseEvaluationClient {
    id: number;
    courseId: number;
    course: CourseClient;
    name: string;
    description: string;
    weight: string;
    status: string;
    evaluationStatus: string;

    constructor(){}
}