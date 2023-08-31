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
    totalCredits: number;
    currentScore?: string;
    isFavorite?: boolean;
    status: string;
    courseStatus: string;

    constructor(){}
}