import { Directive, HostListener, ElementRef, asNativeElements, Input, DebugElement } from '@angular/core';

@Directive({
  selector: '[calc-input]'
})
export class NgCalcInputDirective {

  @Input('calc-input') calcFormat = '140.0';

  constructor(private inputElement: ElementRef) {
  }

  @HostListener('beforeinput', ['$event']) onBeforeInput(event: any) {
    console.log('Event: ');
    console.log(event);
    console.log('inputElemnet');
    console.log(this.inputElement);

    console.log('event.data: ' + event.data);
    if (event.data === null) {
      return;
    }

    if (this.keyPressIsNotValid(event)) {
      event.preventDefault();
    }
  }

  private keyPressIsNotValid(event: any): boolean {
    const maxIntegerLength = parseInt(this.calcFormat, 10);
    console.log('maxIntegerLength: ' + maxIntegerLength);
    const precision = (this.calcFormat && this.calcFormat.includes('.')) ? parseInt(this.calcFormat.split('.')[1], 10) : 0;
    console.log('precision: ' + precision);

    const nativeElement = this.inputElement.nativeElement as HTMLInputElement;
    const beginningSubstring = nativeElement.value.substring(0, nativeElement.selectionStart);
    console.log('beginingSubstring: ' + beginningSubstring);
    const endSubstring = nativeElement.value.substring(nativeElement.selectionEnd, nativeElement.value.length);
    console.log('endSubstring: ' + endSubstring);
    const parsedString = beginningSubstring + event.data + endSubstring;
    console.log('parsedString: ' + parsedString);

    console.log('nativeElement start: ' + nativeElement.selectionStart + ' nativeElement end: ' + nativeElement.selectionEnd);
    console.log('event start: ' + event.target.selectionStart + ' event end: ' + event.target.selectionEnd);

    // tslint:disable-next-line:max-line-length
    const regularExp =  precision && precision > 0 ? `^-?((\\d{0,${maxIntegerLength}}(\\.\\d{0,${precision}})?)|(\\.\\d{0,${precision}}))$` : `^-?(\\d{0,${maxIntegerLength}})$`;

    return !(new RegExp(regularExp).test(parsedString));
  }
}
