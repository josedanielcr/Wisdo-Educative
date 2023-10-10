import { Injectable } from '@angular/core';
import { CourseAdapterService } from './course-adapter.service';
import { CourseLinkClient } from 'src/app/models/core/client/course.link.client.model';
import { CourseLinkServer } from 'src/app/models/core/server/course.link.server.model';

@Injectable({
  providedIn: 'root'
})
export class CourseLinkAdapterService {

  constructor(private courseAdapterService : CourseAdapterService) { }

  public adaptServerToClient(serverObj: CourseLinkServer): CourseLinkClient {
    const clientObj = new CourseLinkClient();
    clientObj.id = serverObj.id;
    clientObj.courseId = serverObj.courseId;
    clientObj.course = serverObj.course ? this.courseAdapterService.adaptServerToClient(serverObj.course) : undefined;
    clientObj.link = serverObj.link || null;
    clientObj.platform = serverObj.platform || null;
    clientObj.status = serverObj.status || null;
    return clientObj;
}

public adaptClientToServer(clientObj: CourseLinkClient): CourseLinkServer {
    const serverObj = new CourseLinkServer();
    serverObj.id = clientObj.id;
    serverObj.courseId = clientObj.courseId;
    serverObj.course = clientObj.course ? this.courseAdapterService.adaptClientToServer(clientObj.course) : undefined;
    serverObj.link = clientObj.link || null;
    serverObj.platform = clientObj.platform || null;
    serverObj.status = clientObj.status || null;
    return serverObj;
}
}
