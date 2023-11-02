import { Injectable } from '@angular/core';
import {ReminderServer} from "../../../models/core/server/reminder.server.model";
import {ReminderClient} from "../../../models/core/client/reminder.client.model";
import {CourseEvaluationTaskAdapterService} from "./course-evaluation-task-adapter.service";

@Injectable({
  providedIn: 'root'
})
export class ReminderAdapterService {

  constructor(private courseEvaluationTaskAdapterService : CourseEvaluationTaskAdapterService) { }

  public adaptServerToClient(reminderServer : ReminderServer): ReminderClient {
    const reminderClient = new ReminderClient();
    reminderClient.id = reminderServer.id;
    reminderClient.name = reminderServer.name;
    reminderClient.courseEvaluationTaskId = reminderServer.courseEvaluationTaskId;
    reminderClient.courseEvaluationTask = reminderServer.courseEvaluationTask ?
      this.courseEvaluationTaskAdapterService.adaptServerToClient(reminderServer.courseEvaluationTask) : undefined;
    reminderClient.date = reminderServer.date;
    reminderClient.status = reminderServer.status;
    reminderClient.isCompleted = reminderServer.isCompleted;
    return reminderClient;
  }

  public adaptClientToServer(reminderClient : ReminderClient): ReminderServer {
    const reminderServer = new ReminderServer();
    reminderServer.id = reminderClient.id;
    reminderServer.name = reminderClient.name;
    reminderServer.courseEvaluationTaskId = reminderClient.courseEvaluationTaskId;
    reminderServer.courseEvaluationTask = reminderClient.courseEvaluationTask ?
      this.courseEvaluationTaskAdapterService.adaptClientToServer(reminderClient.courseEvaluationTask) : undefined;
    reminderServer.date = reminderClient.date;
    reminderServer.status = reminderClient.status;
    reminderServer.isCompleted = reminderClient.isCompleted;
    return reminderServer;
  }
}
