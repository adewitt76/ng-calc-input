import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[calc-input]'
})
export class NgCalcInputDirective {
  private inputElement = HTMLInputElement;

  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    event.preventDefault();
  }
}
