import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChipModel } from 'src/app/models/chip.model';
import { ChipsContainerService } from 'src/app/services/components/chips-container.service';

@Component({
  selector: 'app-chips-container',
  templateUrl: './chips-container.component.html',
  styleUrls: ['./chips-container.component.css']
})
export class ChipsContainerComponent {

  @Input() chips : ChipModel[];
  @Input() limit : number = Infinity;
  @Input() maxChipsPerRow : number;
  public currentSelectedChips : number = 0;

  constructor(private chipsContainerService : ChipsContainerService) { }

  public getSelectedChips(): ChipModel[] {
    return this.chips;
  }

  public emitToggledChips(): void {
    this.currentSelectedChips = this.chips.filter(chip => chip.selected).length;
    this.chipsContainerService.setVariableSubject(this.chips.filter(chip => chip.selected));
  }
}