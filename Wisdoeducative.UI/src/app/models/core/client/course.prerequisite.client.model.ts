import { CourseClient } from "./course.client.model";

export class CoursePrerequisiteClient {
    id: number;
    courseId: number;
    course: CourseClient;
    prerequisiteOfId: number;
    prerequisiteOf: CourseClient;

    constructor(){}
}