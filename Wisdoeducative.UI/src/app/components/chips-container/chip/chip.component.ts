import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChipModel } from 'src/app/models/chip.model';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent {

  @Input() chip : ChipModel;
  @Input() limit : number;
  @Input() currentSelectedChips : number;
  @Output() toggleChip : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public toggleSelected() : void {
    if(this.currentSelectedChips >= this.limit && this.chip.selected === false) return;
    this.chip.selected = !this.chip.selected;
    this.toggleChip.emit();
  }
}
