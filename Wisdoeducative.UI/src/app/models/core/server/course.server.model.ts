import { StudyPlanTermServer } from "./study.plan.term.server.model";

export class CourseServer {
    id: number;
    studyPlanTermId: number;
    studyPlanTermDto: StudyPlanTermServer;
    name: string;
    totalCredits: number;
    currentScore?: string;
    isFavorite?: boolean;
    status: string;
    courseStatus: string;

    constructor() {}
}
