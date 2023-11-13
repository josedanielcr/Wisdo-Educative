import { StudyPlanClient } from "./study.plan.client.model";

export enum studyPlanTermStatus {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Completed = "Completed"
}

export class StudyPlanTermClient {
    id: number;
    studyPlanId: number;
    studyPlanDto: StudyPlanClient;
    name: string;
    startDate: Date;
    endDate: Date;
    periodNumber: number;
    totalCredits: number;
    currentProgress: number;
    studyTermStatus: string;
    status: string;

    constructor(){}
}