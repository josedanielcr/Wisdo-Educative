import { CourseClient } from "./course.client.model";

export class CourseLinkClient {
    id : number;
    courseId : number;
    course : CourseClient;
    link : string;
    platform : string;
    status : string;

    constructor(){}
}