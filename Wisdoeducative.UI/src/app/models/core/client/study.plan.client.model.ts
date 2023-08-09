export class StudyPlanClient {
    id: number;
    userDegreeId: number;
    userDegree: UserDegreeClient;
    gradingSystemId: number;
    gradingSystem: GradingSystemClient;
    totalCredits: number;
    earnedCredits: number;
    status: string;

    constructor(id: number, userDegreeId: number, userDegree: UserDegreeClient, gradingSystemId: number, gradingSystem: GradingSystemClient, totalCredits: number, earnedCredits: number, status: string) {
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