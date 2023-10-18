import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPreventEdit]'
})
export class PreventEditDirective {

  @Input() appPreventEdit: boolean;

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.appPreventEdit) {
      event.preventDefault();
    }
  }

}