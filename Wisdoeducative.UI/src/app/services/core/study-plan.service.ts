import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationErrorService } from '../helpers/application-error.service';
import { ApiUrlService } from '../helpers/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanService {

  constructor(private http : HttpClient,
    private applicationErrorService : ApplicationErrorService,
    private apiUrlService : ApiUrlService) { }
}
