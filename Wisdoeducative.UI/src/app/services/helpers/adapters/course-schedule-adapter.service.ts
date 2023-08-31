import { Injectable } from '@angular/core';
import { CourseScheduleClient } from 'src/app/models/core/client/course.schedule.client.model';
import { CourseScheduleServer } from 'src/app/models/core/server/course.schedule.server.model';

@Injectable({
  providedIn: 'root'
})
export class CourseScheduleAdapterService {

  constructor() { }

  public adaptServerToClient(serverObj: CourseScheduleServer): CourseScheduleClient {
      const clientObj = new CourseScheduleClient();
      clientObj.id = serverObj.id;
      clientObj.weekDay = serverObj.weekDay;
      clientObj.startTime = serverObj.startTime;
      clientObj.endTime = serverObj.endTime;
      return clientObj;
  }

  public adaptClientToServer(clientObj: CourseScheduleClient): CourseScheduleServer {
      const serverObj = new CourseScheduleServer();
      serverObj.id = clientObj.id;
      serverObj.weekDay = clientObj.weekDay;
      serverObj.startTime = clientObj.startTime;
      serverObj.endTime = clientObj.endTime;
      return serverObj;
  }
}
