import { GradingSystemClient } from "./grading.system.client.model";
import { UserDegreeClient } from "./user.degree.client.model";

export class StudyPlanClient {
    id: number | null;
    userDegreeId: number | null;
    userDegree: UserDegreeClient | null;
    gradingSystemId: number | null;
    gradingSystem: GradingSystemClient | null;
    totalCredits: number | null;
    earnedCredits: number | null;
    status: string | null;

    constructor(){}
}