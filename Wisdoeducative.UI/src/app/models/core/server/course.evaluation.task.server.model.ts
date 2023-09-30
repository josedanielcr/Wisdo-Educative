import { CourseEvaluationServer } from "./course.evaluation.server.model";

export class CourseEvaluationTaskServer {
    id: number;
    name: string;
    description: string;
    courseEvaluationId : number;
    courseEvaluation : CourseEvaluationServer;
    weight: number;
    status: string;
    evaluationStatus: string;

    constructor(){}
}