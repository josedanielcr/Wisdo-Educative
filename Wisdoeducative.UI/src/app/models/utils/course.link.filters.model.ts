export class CourseLinkFilters {
    taskName : string;
    courseId : number;

    constructor(PtaskName : string, courseId : number) {
        this.taskName = PtaskName;
        this.courseId = courseId;
    }
}