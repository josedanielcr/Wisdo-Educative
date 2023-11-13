import { StudyPlanServer } from "./study.plan.server.model";

export class StudyPlanTermServer {
    id: number;
    studyPlanId: number;
    studyPlanDto: StudyPlanServer;
    periodNumber: number;
    name: string;
    startDate: Date;
    endDate: Date;
    totalCredits: number;
    currentProgress: number;
    studyTermStatus: string;
    status: string;

    constructor(){}
}