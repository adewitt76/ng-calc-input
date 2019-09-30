import { Directive, HostListener, ElementRef, asNativeElements, Input, DebugElement } from '@angular/core';

@Directive({
  selector: '[calc-input]'
})
export class NgCalcInputDirective {

  @Input('calc-input') calcFormat = '140.0';

  constructor(private inputElement: ElementRef) {
  }

  @HostListener('beforeinput', ['$event']) onBeforeInput(event: any) {
    if (event.data === null) {
      return;
    }
    if (this.keyPressIsNotValid(event)) {
      event.preventDefault();
      return;
    }
  }

  private keyPressIsNotValid(event: any): boolean {
    const maxIntegerLength = parseInt(this.calcFormat, 10);
    const precision = (this.calcFormat && this.calcFormat.includes('.')) ? parseInt(this.calcFormat.split('.')[1], 10) : 0;

    const nativeElement = this.inputElement.nativeElement as HTMLInputElement;
    const beginningSubstring = nativeElement.value.substring(0, nativeElement.selectionStart);
    const endSubstring = nativeElement.value.substring(nativeElement.selectionEnd, nativeElement.value.length);
    const parsedString = beginningSubstring + event.data + endSubstring;

    // tslint:disable-next-line:max-line-length
    const regularExp =  precision && precision > 0 ? `^-?((\\d{0,${maxIntegerLength}}(\\.\\d{0,${precision}})?)|(\\.\\d{0,${precision}}))$` : `^-?(\\d{0,${maxIntegerLength}})$`;

    return !(new RegExp(regularExp).test(parsedString));
  }
}
