import { Injectable } from '@angular/core';
import { CourseAdapterService } from './course-adapter.service';
import { CourseLinkClient } from 'src/app/models/core/client/course.link.client.model';
import { CourseLinkServer } from 'src/app/models/core/server/course.link.server.model';
import { CourseEvaluationTaskAdapterService } from './course-evaluation-task-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class CourseLinkAdapterService {

  constructor(private courseAdapterService : CourseAdapterService,
    private courseEvaluationTaskAdapter : CourseEvaluationTaskAdapterService) { }

  public adaptServerToClient(serverObj: CourseLinkServer): CourseLinkClient {
    const clientObj = new CourseLinkClient();
    clientObj.id = serverObj.id;
    clientObj.link = serverObj.link || null;
    clientObj.name = serverObj.name || null;
    clientObj.courseEvaluationTask = serverObj.courseEvaluationTask ?
        this.courseEvaluationTaskAdapter.adaptServerToClient(serverObj.courseEvaluationTask) : undefined;
    clientObj.platform = serverObj.platform || null;
    clientObj.courseEvaluationTaskId = serverObj.courseEvaluationTaskId || null;
    clientObj.status = serverObj.status || null;
    return clientObj;
}

public adaptClientToServer(clientObj: CourseLinkClient): CourseLinkServer {
    const serverObj = new CourseLinkServer();
    serverObj.id = clientObj.id;
    serverObj.link = clientObj.link || null;
    serverObj.name = clientObj.name || null;
    serverObj.courseEvaluationTask = clientObj.courseEvaluationTask ?
        this.courseEvaluationTaskAdapter.adaptClientToServer(clientObj.courseEvaluationTask) : undefined;
    serverObj.platform = clientObj.platform || null;
    serverObj.courseEvaluationTaskId = clientObj.courseEvaluationTaskId || null;
    serverObj.status = clientObj.status || null;
    return serverObj;
}
}
