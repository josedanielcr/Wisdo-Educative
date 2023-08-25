import { CoursePrerequisiteServer } from "./course.prerequisite.server.model";
import { CourseScheduleServer } from "./course.schedule.server.model";
import { StudyPlanTermServer } from "./study.plan.term.server.model";

export class CourseServer {
    id: number;
    studyPlanTermId: number;
    studyPlanTerm: StudyPlanTermServer;
    courseScheduleId?: number;
    courseSchedule?: CourseScheduleServer;
    coursePrerequisites?: CoursePrerequisiteServer[];
    name: string;
    totalCredits: number;
    currentScore?: string;
    status: string;
    courseStatus: string;

    constructor() {}
}
