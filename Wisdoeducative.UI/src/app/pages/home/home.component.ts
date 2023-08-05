import { Component, OnInit } from '@angular/core';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { AuthService } from 'src/app/services/core/auth.service';
import { DegreeService } from 'src/app/services/core/degree.service';

enum TimeOfDay {
  Morning = 0,
  Afternoon = 1,
  Evening = 2
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  // constants
  private morningPath = '../../../assets/icons/sun 1.svg';
  private afternoonPath = '../../../assets/icons/coffee 1.svg';
  private eveningPath = '../../../assets/icons/moon 1.svg';
  private morningGreeting = 'Buenos días';
  private afternoonGreeting = 'Linda tarde';
  private eveningGreeting = 'Buenas noches';

  // properties
  public user : UserClient;
  public userDegrees : UserDegreeClient[];
  
  // util
  public currentTimeOfDay : TimeOfDay;
  public TimeOfDay = TimeOfDay;
  public timeOfDayIcon : string;
  public timeOfDayGreeting : string;

  constructor(private authService : AuthService,
    private degreeService : DegreeService){}

  ngOnInit(): void {
    this.getUser();
    this.setCurrentTimeOfDay();
    this.setTimeOfDayIcon();
  }

  private setCurrentTimeOfDay(): void {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      this.currentTimeOfDay = TimeOfDay.Morning;
    } else if (currentHour >= 12 && currentHour < 18) {
      this.currentTimeOfDay = TimeOfDay.Afternoon;
    } else {
      this.currentTimeOfDay = TimeOfDay.Evening;
    }
  }

  public setTimeOfDayIcon(): void {
    switch (this.currentTimeOfDay) {
      case TimeOfDay.Morning:
        this.timeOfDayIcon = this.morningPath;
        this.timeOfDayGreeting = this.morningGreeting;
        break;
      case TimeOfDay.Afternoon:
        this.timeOfDayIcon =this.afternoonPath;
        this.timeOfDayGreeting = this.afternoonGreeting;
        break;
      case TimeOfDay.Evening:
        this.timeOfDayIcon = this.eveningPath;
        this.timeOfDayGreeting = this.eveningGreeting;
    }
  }

  private getUser(): void {
    this.authService.getUserSubject().subscribe((user: UserClient) => {
      this.user = user;
      this.getUserDegrees();
    });
  }

  private getUserDegrees(): void {
    this.degreeService.getUserDegrees(this.user.id).subscribe((userDegrees: UserDegreeClient[]) => {
      this.userDegrees = userDegrees;
      console.log(this.userDegrees);
    });
  }

}