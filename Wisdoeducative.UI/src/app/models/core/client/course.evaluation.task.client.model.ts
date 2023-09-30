import { CourseEvaluationClient } from "./course.evaluation.client.model";

export class CourseEvaluationTaskClient {
    id: number;
    name: string;
    description: string;
    courseEvaluationId : number;
    courseEvaluation : CourseEvaluationClient;
    weight: number;
    status: string;
    evaluationStatus: string;

    constructor(){}
}