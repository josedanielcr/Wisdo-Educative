import { Injectable } from '@angular/core';
import { CourseScheduleClient } from 'src/app/models/core/client/course.schedule.client.model';
import { CourseScheduleServer } from 'src/app/models/core/server/course.schedule.server.model';

@Injectable({
  providedIn: 'root'
})
export class CourseScheduleAdapterService {

  constructor() { }

  public adaptServerToClient(serverObj: CourseScheduleServer): CourseScheduleClient {
    return new CourseScheduleClient(
        serverObj.id, 
        serverObj.weekDay, 
        serverObj.startTime,
        serverObj.endTime
    );
}

public adaptClientToServer(clientObj: CourseScheduleClient): CourseScheduleServer {
    return new CourseScheduleServer(
        clientObj.id, 
        clientObj.weekDay, 
        clientObj.startTime,
        clientObj.endTime
    );
}
}
