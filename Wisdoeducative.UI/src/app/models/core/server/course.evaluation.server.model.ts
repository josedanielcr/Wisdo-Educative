export class CourseEvaluationServer {
    id: number;
    courseId: number;
    course: CourseServer;
    name: string;
    description: string;
    weight: string;
    status: string;
    evaluationStatus: string;

    constructor(id: number, courseId: number, course: CourseServer, name: string, description: string, weight: string, status: string, evaluationStatus: string) {
        this.id = id;
        this.courseId = courseId;
        this.course = course;
        this.name = name;
        this.description = description;
        this.weight = weight;
        this.status = status;
        this.evaluationStatus = evaluationStatus;
    }
}