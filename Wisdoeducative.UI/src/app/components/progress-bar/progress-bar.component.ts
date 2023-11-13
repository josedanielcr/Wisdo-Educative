import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  @Input() progress: number;
  public width : number = 5.4375;
  public readonly colors : Map<number, string> = new Map([
    [35, 'rgba(255, 202, 16, 0.78)'],
    [69, '#256E8E'],
    [100, '#1ECF45']
  ]);

  constructor() { }

  public getColor(): string {
    if (this.progress <= 35) {
      return this.colors.get(35);
    } else if (this.progress <= 69) {
      return this.colors.get(69);
    } else if (this.progress >= 70 && this.progress <= 100){
      return this.colors.get(100);
    }
    return this.colors.get(35);
  }
}
