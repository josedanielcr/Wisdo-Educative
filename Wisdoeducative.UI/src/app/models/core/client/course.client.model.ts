import { CoursePrerequisiteClient } from "./course.prerequisite.client.model";
import { CourseScheduleClient } from "./course.schedule.client.model";
import { StudyPlanTermClient } from "./study.plan.term.client.model";

export class CourseClient {
    id: number;
    studyPlanTermId: number;
    studyPlanTerm: StudyPlanTermClient;
    courseScheduleId?: number;
    courseSchedule?: CourseScheduleClient;
    coursePrerequisites?: CoursePrerequisiteClient[];
    name: string;
    description?: string;
    totalCredits: number;
    startDate?: Date;
    endDate?: Date;
    currentScore?: string;
    price?: number;
    status: string;
    courseStatus: string;

    constructor(id: number, studyPlanTermId: number, studyPlanTerm: StudyPlanTermClient, courseScheduleId: number, courseSchedule: CourseScheduleClient, name: string, description: string, totalCredits: number, startDate: Date, endDate: Date, currentScore: string, price: number, status: string, courseStatus: string) {
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