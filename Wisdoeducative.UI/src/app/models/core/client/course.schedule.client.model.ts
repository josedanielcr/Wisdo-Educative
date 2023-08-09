export class CourseScheduleClient {
    id: number;
    weekDay: number;
    startTime: Date;
    endTime: Date;

    constructor(id: number, weekDay: number, startTime: Date, endTime: Date) {
        this.id = id;
        this.weekDay = weekDay;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}