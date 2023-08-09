import { CourseClient } from "./course.client.model";

export class CoursePrerequisiteClient {
    id: number;
    courseId: number;
    course: CourseClient;
    prerequisiteOfId: number;
    prerequisiteOf: CourseClient;

    constructor(id: number, courseId: number, course: CourseClient, prerequisiteOfId: number, prerequisiteOf: CourseClient) {
        this.id = id;
        this.courseId = courseId;
        this.course = course;
        this.prerequisiteOfId = prerequisiteOfId;
        this.prerequisiteOf = prerequisiteOf;
    }
}