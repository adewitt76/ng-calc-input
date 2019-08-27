import { Directive, HostListener, ElementRef, asNativeElements } from '@angular/core';

@Directive({
  selector: '[calc-input]'
})
export class NgCalcInputDirective {
  private inputElement;

  constructor(private el: ElementRef) {
    this.inputElement = el;
  }

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const key = event.key;
    const isNumber = new RegExp('[0-9]').test(key);
    const isPeriod = key === '.';
    const isNegative = key === '-';
    const isFirstNumber = this.inputElement.nativeElement.selectionStart === 0;
    const isZero = key === '0';

    if (isNumber === false &&
      isPeriod === false &&
      isNegative === false) {
      event.preventDefault();
      return;
    }

    if (isNegative) {
      if (this.inputElement.nativeElement.selectionStart !== 0 ||
        this.inputElement.nativeElement.value.includes('-')) {
        event.preventDefault();
        return;
      }
    }

    if (isPeriod) {
      if (this.inputElement.nativeElement.value.includes('.')) {
        event.preventDefault();
        return;
      }
    }

    if (isFirstNumber && this.inputElement.nativeElement.value < 0) {
      event.preventDefault();
    }

    if (isZero) {
      if (this.inputElement.nativeElement.value && isFirstNumber) {
        event.preventDefault();
        return;
      }
    }
  }
}
