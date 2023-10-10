import { CourseEvaluationClient } from "./course.evaluation.client.model";

export class CourseEvaluationTaskClient {
    id: number;
    name: string;
    description: string;
    courseEvaluationId : number;
    courseEvaluation : CourseEvaluationClient;
    startDate: Date;
    endDate: Date;
    totalScore : number;
    weight: number;
    status: string;
    evaluationStatus: string;

    constructor(){}
}