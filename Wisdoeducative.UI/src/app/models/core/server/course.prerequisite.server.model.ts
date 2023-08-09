import { CourseServer } from "./course.server.model";

export class CoursePrerequisiteServer {
    id: number;
    courseId: number;
    course: CourseServer;
    prerequisiteOfId: number;
    prerequisiteOf: CourseServer;

    constructor(id: number, courseId: number, course: CourseServer, prerequisiteOfId: number, prerequisiteOf: CourseServer) {
        this.id = id;
        this.courseId = courseId;
        this.course = course;
        this.prerequisiteOfId = prerequisiteOfId;
        this.prerequisiteOf = prerequisiteOf;
    }
}