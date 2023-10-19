import { Injectable } from '@angular/core';
import { PomodoroClient } from 'src/app/models/core/client/pomodoro.client';
import { PomodoroServer } from 'src/app/models/core/server/pomodoro.server';
import { CourseEvaluationTaskAdapterService } from './course-evaluation-task-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class PomodoroAdapterService {

  constructor(private courseEvaluationTaskAdapter : CourseEvaluationTaskAdapterService) { }

  public adaptServerToClient(pomodoroServer : PomodoroServer): PomodoroClient {
      const pomodoroClient = new PomodoroClient();
      pomodoroClient.id = pomodoroServer.id;
      pomodoroClient.courseEvaluationTask = pomodoroServer.courseEvaluationTask ?
        this.courseEvaluationTaskAdapter.adaptServerToClient(pomodoroServer.courseEvaluationTask) : undefined;
      pomodoroClient.CourseEvaluationTaskId = pomodoroServer.CourseEvaluationTaskId;
      pomodoroClient.initialTime = pomodoroServer.initialTime;
      pomodoroClient.endTime = pomodoroServer.endTime;
      pomodoroClient.status = pomodoroServer.status;
      return pomodoroClient;
  }

  public adaptClientToServer(pomodoroClient : PomodoroClient): PomodoroServer {
      const pomodoroServer = new PomodoroServer();
      pomodoroServer.id = pomodoroClient.id;
      pomodoroServer.courseEvaluationTask = pomodoroClient.courseEvaluationTask ?
        this.courseEvaluationTaskAdapter.adaptClientToServer(pomodoroClient.courseEvaluationTask) : undefined;
      pomodoroServer.CourseEvaluationTaskId = pomodoroClient.CourseEvaluationTaskId;
      pomodoroServer.initialTime = pomodoroClient.initialTime;
      pomodoroServer.endTime = pomodoroClient.endTime;
      pomodoroServer.status = pomodoroClient.status;
      return pomodoroServer;
  }
}
