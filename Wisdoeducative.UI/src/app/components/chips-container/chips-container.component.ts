import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChipModel } from 'src/app/models/chip.model';

@Component({
  selector: 'app-chips-container',
  templateUrl: './chips-container.component.html',
  styleUrls: ['./chips-container.component.css']
})
export class ChipsContainerComponent {

    @Input() chips : ChipModel[];
    @Input() maxChipsPerRow : number;
    @Output() toggleChip : EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    public getSelectedChips(): ChipModel[] {
      return this.chips;
    }

    public emitToggleChip(): void {
      this.toggleChip.emit(this.chips.filter(chip => chip.selected));
    }
}