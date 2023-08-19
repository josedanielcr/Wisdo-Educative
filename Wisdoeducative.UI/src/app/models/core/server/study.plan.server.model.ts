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

    constructor(id?: number, userDegreeId?: number, userDegree?: UserDegreeServer, 
        gradingSystemId?: number, gradingSystem?: GradingSystemServer, totalCredits?: number, earnedCredits?: number, status?: string) {
        this.id = id;
        this.userDegreeId = userDegreeId;
        this.userDegree = userDegree;
        this.gradingSystemId = gradingSystemId;
        this.gradingSystem = gradingSystem;
        this.totalCredits = totalCredits;
        this.earnedCredits = earnedCredits;
        this.status = status;
    }
}