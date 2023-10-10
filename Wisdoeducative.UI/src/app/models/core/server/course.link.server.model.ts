import { CourseServer } from "./course.server.model";

export class CourseLinkServer {
    id : number;
    courseId : number;
    course : CourseServer;
    link : string;
    platform : string;
    status : string;

    constructor(){}
}