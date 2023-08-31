import { StudyPlanServer } from "./study.plan.server.model";

export class StudyPlanTermServer {
    id: number;
    studyPlanId: number;
    studyPlan: StudyPlanServer;
    periodNumber: number;
    name: string;
    startDate: Date;
    endDate: Date;
    studyTermStatus: string;
    status: string;

    constructor(){}
}