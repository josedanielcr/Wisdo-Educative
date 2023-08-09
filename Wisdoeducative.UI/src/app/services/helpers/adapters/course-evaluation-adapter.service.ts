import { Injectable } from '@angular/core';
import { CourseEvaluationClient } from 'src/app/models/core/client/course.evaluation.client.model';
import { CourseEvaluationServer } from 'src/app/models/core/server/course.evaluation.server.model';
import { CourseAdapterService } from './course-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class CourseEvaluationAdapterService {

  constructor(private courseAdapter: CourseAdapterService) { }

    public adaptServerToClient(serverObj: CourseEvaluationServer): CourseEvaluationClient {
        return new CourseEvaluationClient(
            serverObj.id, 
            serverObj.courseId, 
            this.courseAdapter.adaptServerToClient(serverObj.course),
            serverObj.name, 
            serverObj.description,
            serverObj.weight,
            serverObj.status, 
            serverObj.evaluationStatus
        );
    }

    public adaptClientToServer(clientObj: CourseEvaluationClient): CourseEvaluationServer {
        return new CourseEvaluationServer(
            clientObj.id, 
            clientObj.courseId, 
            this.courseAdapter.adaptClientToServer(clientObj.course),
            clientObj.name, 
            clientObj.description,
            clientObj.weight,
            clientObj.status, 
            clientObj.evaluationStatus
        );
    }
}
