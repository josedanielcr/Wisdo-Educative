import { StudyPlanClient } from "./study.plan.client.model";

export class StudyPlanTermClient {
    id: number;
    studyPlanId: number;
    studyPlan: StudyPlanClient;
    periodNumber: number;
    studyTermStatus: string;
    status: string;

    constructor(id: number, studyPlanId: number, studyPlan: StudyPlanClient, periodNumber: number, studyTermStatus: string, status: string) {
        this.id = id;
        this.studyPlanId = studyPlanId;
        this.studyPlan = studyPlan;
        this.periodNumber = periodNumber;
        this.studyTermStatus = studyTermStatus;
        this.status = status;
    }
}