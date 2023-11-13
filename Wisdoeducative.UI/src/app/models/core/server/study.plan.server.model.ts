import { GradingSystemServer } from "./grading.system.server.model";
import { UserDegreeServer } from "./user.degree.server.model";

export class StudyPlanServer {
    id?: number;
    userDegreeId?: number;
    userDegree?: UserDegreeServer;
    gradingSystemId?: number;
    gradingSystem?: GradingSystemServer;
    totalCredits?: number;
    earnedCredits?: number;
    status?: string;

    constructor(){}
}