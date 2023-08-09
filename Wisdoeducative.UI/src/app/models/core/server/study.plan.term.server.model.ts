import { StudyPlanServer } from "./study.plan.server.model";

export class StudyPlanTermServer {
    id: number;
    studyPlanId: number;
    studyPlan: StudyPlanServer;
    periodNumber: number;
    studyTermStatus: string;
    status: string;

    constructor(id: number, studyPlanId: number, studyPlan: StudyPlanServer, periodNumber: number, studyTermStatus: string, status: string) {
        this.id = id;
        this.studyPlanId = studyPlanId;
        this.studyPlan = studyPlan;
        this.periodNumber = periodNumber;
        this.studyTermStatus = studyTermStatus;
        this.status = status;
    }
}