import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { SetUpDegree } from 'src/app/models/utils/setup.degree.model';
import { UserAdapterService } from '../helpers/adapters/user-adapter.service';
import { UserDegreeAdapterService } from '../helpers/adapters/user-degree-adapter.service';
import { UserDegreeServer } from 'src/app/models/core/server/user.degree.server.model';
import { ApplicationErrorService } from '../helpers/application-error.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  constructor(private http : HttpClient,
    private userDegreeAdapater : UserDegreeAdapterService,
    private applicationErrorService : ApplicationErrorService) { }
}