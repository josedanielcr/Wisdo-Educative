import { CourseEvaluationServer } from "./course.evaluation.server.model";

export class CourseEvaluationTaskServer {
    id: number;
    name: string;
    description: string;
    courseEvaluationId : number;
    courseEvaluation : CourseEvaluationServer;
    startDate: Date;
    endDate: Date;
    totalScore : number;
    weight: number;
    status: string;
    evaluationStatus: string;

    constructor(){}
}