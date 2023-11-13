import { StudyPlanTermClient } from "./study.plan.term.client.model";

export class CourseClient {
    id: number;
    studyPlanTermId: number;
    studyPlanTermDto: StudyPlanTermClient;
    name: string;
    totalCredits: number;
    currentScore?: string;
    isFavorite?: boolean;
    status: string;
    courseStatus: string;

    constructor(){}
}