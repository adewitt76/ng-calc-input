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
    if (this.keyPressIsNotValid(key)) {
      event.preventDefault();
    }
  }

  private keyPressIsNotValid(key: string): boolean {
    const isNumber = new RegExp('[0-9]').test(key);
    const isPeriod = key === '.';
    const isNegative = key === '-';

    if (isNumber === false &&
      isPeriod === false &&
      isNegative === false) {
      return true;
    }

    if (isNegative) {
      if (!(this.inputElement.nativeElement.selectionStart === 0 ||
          this.inputElement.nativeElement.selectionStart === null) ||
          this.inputElement.nativeElement.value.includes('-') ||
          this.inputElement.nativeElement.value < 0 ) {
        return true;
      }
    }

    if (isPeriod) {
      if (this.inputElement.nativeElement.value.includes('.')) {
        return true;
      }
    }

    return this.isSpecialRule(key);
  }

  private isSpecialRule(key: string): boolean {
    const isLeadingCharacter = this.inputElement.nativeElement.selectionStart === 0;
    const isZero = key === '0';

    if (isLeadingCharacter && this.inputElement.nativeElement.value < 0) {
      return true;
    }

    if (isZero) {
      if (this.inputElement.nativeElement.value && isLeadingCharacter) {
        return true;
      }
    }
    return false;
  }
}
