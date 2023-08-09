import { StudyPlanTermServer } from "./study.plan.term.server.model";

export class CourseServer {
    id: number;
    studyPlanTermId: number;
    studyPlanTerm: StudyPlanTermServer;
    courseScheduleId?: number;
    courseSchedule?: CourseScheduleServer;
    coursePrerequisites?: CoursePrerequisiteServer[];
    name: string;
    description?: string;
    totalCredits: number;
    startDate?: Date;
    endDate?: Date;
    currentScore?: string;
    price?: number;
    status: string;
    courseStatus: string;

    constructor(id: number, studyPlanTermId: number, studyPlanTerm: StudyPlanTermServer, courseScheduleId: number, courseSchedule: CourseScheduleServer, name: string, description: string, totalCredits: number, startDate: Date, endDate: Date, currentScore: string, price: number, status: string, courseStatus: string) {
        this.id = id;
        this.studyPlanTermId = studyPlanTermId;
        this.studyPlanTerm = studyPlanTerm;
        this.courseScheduleId = courseScheduleId;
        this.courseSchedule = courseSchedule;
        this.name = name;
        this.description = description;
        this.totalCredits = totalCredits;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentScore = currentScore;
        this.price = price;
        this.status = status;
        this.courseStatus = courseStatus;
    }
}