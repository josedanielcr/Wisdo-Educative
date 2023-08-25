import { StudyPlanClient } from "./study.plan.client.model";

export class StudyPlanTermClient {
    id: number;
    studyPlanId: number;
    studyPlan: StudyPlanClient;
    name: string;
    startDate: Date;
    endDate: Date;
    periodNumber: number;
    studyTermStatus: string;
    status: string;

    constructor(){}
}
