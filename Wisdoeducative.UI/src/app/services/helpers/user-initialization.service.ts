import { Injectable } from '@angular/core';
import { DegreeService } from '../core/models/degree.service';
import { StudyPlanService } from '../core/models/study-plan.service';
import { Observable, catchError, combineLatest, finalize, forkJoin, of, startWith, switchMap, take, tap } from 'rxjs';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { ApplicationErrorService } from './application-error.service';
import { StoreService } from '../core/store.service';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserService } from '../core/models/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserInitializationService {

  constructor(private degreeService : DegreeService,
    private studyPlanService : StudyPlanService,
    private storeService : StoreService,
    private userService : UserService) { }


  public initializeUser(): Observable<[UserClient | null, UserDegreeClient | null, StudyPlanClient | null, StudyPlanTermClient[] | null]> {
    return this.getUser$().pipe(
      switchMap(user => {
        if (!user) {
          return of([null, null, null, null] as [UserClient | null, UserDegreeClient | null, StudyPlanClient | null, StudyPlanTermClient[] | null]);
        }

        const userDegree$ = this.getUserDegree$(user.id);
        const studyPlan$ = userDegree$.pipe(
          switchMap(userDegree => userDegree ? this.getStudyPlan$(userDegree.id) : of(null))
        );
        const studyPlanTerms$ = studyPlan$.pipe(
          switchMap(studyPlan => studyPlan ? this.getStudyPlanTerms$(studyPlan.id) : of(null))
        );

        return combineLatest([
          of(user),
          userDegree$,
          studyPlan$,
          studyPlanTerms$
        ]);
      }),
      catchError(() => {
        return of([null, null, null, null] as [UserClient | null, UserDegreeClient | null, StudyPlanClient | null, StudyPlanTermClient[] | null]);
      })
    );
  }
    
  public getUserDegree$(userId : number): Observable<UserDegreeClient> {
    return this.storeService.select('userDegree').pipe(
      take(1),
      startWith(null),
      switchMap((userDegree: UserDegreeClient | null) => {
        if (userDegree) {
          return of(userDegree);
        }
        throw new Error();
      }),
      catchError(() => {
        return this.degreeService.getUserDegree(userId).pipe(
          tap((fetchedUserDegree: UserDegreeClient) => {
            this.storeService.set('userDegree', fetchedUserDegree);
          }),
          catchError(() => {
            return of(null);
          })
        );
      })
    );
  }
  
  public getStudyPlan$(userDegreeId: number): Observable<StudyPlanClient | null> {
    return this.storeService.select('studyPlan').pipe(
      take(1),
      startWith(null),
      switchMap((studyPlan: StudyPlanClient | null) => {
        if (studyPlan) {
          return of(studyPlan);
        }
        throw new Error();
      }),
      catchError(() => {
        return this.studyPlanService.getUserStudyPlanByUserDegree(userDegreeId).pipe(
          tap((fetchedUserStudyPlan: StudyPlanClient) => {
            this.storeService.set('studyPlan', fetchedUserStudyPlan);
          }),
          catchError(() => {
            return of(null);
          })
        );
      })
    );
  }
  
  public getStudyPlanTerms$(studyPlanId: number): Observable<StudyPlanTermClient[]> {
    return this.studyPlanService.getStudyPlanTerms(studyPlanId);
  }

  public getUser$(): Observable<UserClient> {
    return this.storeService.select('user').pipe(
      take(1),
      startWith(null),
      switchMap((user: UserClient | null) => {
        if (user) {
          return of(user);
        }
        throw new Error();
      }),
      catchError(() => {
        return this.userService.validateUser().pipe(
          tap((fetchedUser: UserClient) => {
            this.storeService.set('user', fetchedUser);
          }),
          catchError(() => {
            return of(null);
          })
        );
      })
    );
  }
}