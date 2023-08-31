import { CourseServer } from "./course.server.model";

export class CoursePrerequisiteServer {
    id: number;
    courseId: number;
    course: CourseServer;
    prerequisiteOfId: number;
    prerequisiteOf: CourseServer;

    constructor(){}
}