import { NgCalcInputDirective } from './ng-calc-input.directive';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  template: `<input type="text" [calc-input]="calcFormat" [formControl]="numberInput">`
})
class TestInputComponent {
  numberInput = new FormControl('');
  calcFormat = '';

  onKeyPress(event: KeyboardEvent) {
    this.numberInput.setValue(event.key);
  }
}

describe('NgCalcInputDirective', () => {
  let component: TestInputComponent;
  let fixture: ComponentFixture<TestInputComponent>;
  let inputDebugElement: DebugElement;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestInputComponent,
        NgCalcInputDirective
      ],
      imports: [
        ReactiveFormsModule
      ]
    });
    fixture = TestBed.createComponent(TestInputComponent);
    component = fixture.componentInstance;
    inputDebugElement = fixture.debugElement.query(By.css('input'));
    inputElement = inputDebugElement.nativeElement;
  });

  it('should update the field numericalInput.value when input value is updated', () => {
    // TODO: SEE IF YOU CAN DELETE THIS TEST
    inputElement.value = '123';
    inputElement.selectionStart = 0;
    inputElement.selectionEnd = 3;
    inputElement.dispatchEvent(new Event('input'));

    const event = new KeyboardEvent('keypress', { key: ' ' });
    spyOn(event, 'preventDefault');

    inputElement.dispatchEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();

  });

  it('should accept a number when a number key is pressed', () => {
    const keypress = (Math.floor(Math.random() * 9) + 1).toString();
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).not.toHaveBeenCalled();
  });

  it('should accept a decimal point', () => {
    setFormat(1, 1);
    const keypress = '.';
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).not.toHaveBeenCalled();
  });

  it('should accept a negative character', () => {
    const keypress = '-';
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).not.toHaveBeenCalled();
  });

  it('should not allow letters to be typed', () => {
    const keypress = 'e';
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).toHaveBeenCalled();
  });

  it('should not allow negative key to be pressed when current position of cursor is not at the start of the line.', () => {
    const keypress = '-';
    setComponentValue('123', 2, 2);
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).toHaveBeenCalled();
  });

  it('should not allow negative key to be pressed again when negative symbol is present.', () => {
    const keypress = '-';
    setComponentValue('-123', 0, 0);
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).toHaveBeenCalled();
  });

  it('Should not allow more than one decimal characters', () => {
    const keypress = '.';
    setComponentValue('0.');
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).toHaveBeenCalled();
  });

  xit('should not allow a zero key to be pressed when there is a value and the cursor is at the start of the line', () => {
    const keypress = '0';
    setComponentValue('120', 0, 0);
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).toHaveBeenCalled();
  });

  it('should not allow any character to be typed before a negative sign', () => {
    const keypress = '.';
    setComponentValue('-120', 0, 0);
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).toHaveBeenCalled();
  });

  it('should not allow more characters than max character limit', () => {
    const maxCharLimit = 3;
    component.calcFormat = maxCharLimit.toString();
    fixture.detectChanges();
    setComponentValue('123');
    const eventSpy = simulateKeyPress('4');
    expect(eventSpy.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should allow more characters when not at max character limit', () => {
    const maxCharLimit = 4;
    component.calcFormat = maxCharLimit.toString();
    fixture.detectChanges();
    setComponentValue('123');
    const eventSpy = simulateKeyPress('4');
    expect(eventSpy.preventDefault).not.toHaveBeenCalled();
  });

  it('Should not allow the decimal key to print when maxPrecision is 0', () => {
    setFormat(5, 0);
    setComponentValue('12');
    const eventSpy = simulateKeyPress('.');
    expect(eventSpy.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('Should allow the decimal key to print when maxPrecision is 1', () => {
    setFormat(2, 1);
    setComponentValue('0');
    const eventSpy = simulateKeyPress('.');
    expect(eventSpy.preventDefault).not.toHaveBeenCalled();
  });

  it('Should allow the decimal key to print when maxPrecision is 3 with multiple zeros after the decimal', () => {
    setFormat(1, 3);
    setComponentValue('1.00');
    const eventSpy = simulateKeyPress('2');
    expect(eventSpy.preventDefault).not.toHaveBeenCalled();
  });

  it('Should allow the negative key to print when maxInteger is 0 and maxPrecision is greater than 0', () => {
    setFormat(0, 1);
    setComponentValue('');
    const eventSpy = simulateKeyPress('-');
    expect(eventSpy.preventDefault).not.toHaveBeenCalled();
  });

  it('Should not allow the decimal key to print when maxPrecision is 3 and the 4th digit is typed to the right of the decimal', () => {
    setFormat(1, 3);
    setComponentValue('1.000');
    const eventSpy = simulateKeyPress('0');
    expect(eventSpy.preventDefault).toHaveBeenCalledTimes(1);
  });

  //   it('should allow a zero key to be pressed when all is selected', () => {
  //     setComponentValue('120');
  //     _inputElement.selectionStart = 0;
  //     _inputElement.selectionEnd = 3;
  //     simulateKeyPress('0');
  //     expect(_component.numericalInput.value).toBe('0');
  //   });

  //   it('Should allow only one zero after a negative', () => {
  //     setComponentValue('-0');
  //     simulateKeyPress('0');
  //     expect(_component.numericalInput.value).toBe('-0');
  //   });

  //   it('Should change -0 to -NumberOtherThanZero when number other than zero is typed', () => {
  //     setComponentValue('-0');
  //     simulateKeyPress('1');
  //     expect(_component.numericalInput.value).toBe('-1');
  //   });

  //   it('Should change -0000 to -NumberOtherThanZero when number other than zero is typed', () => {
  //     setComponentValue('-00000');
  //     simulateKeyPress('1');
  //     expect(_component.numericalInput.value).toBe('-1');
  //   });


  function setComponentValue(value: string, selectionStart?: number, selectionEnd?: number): void {
    inputElement.value = value;
    inputElement.setSelectionRange(
      selectionStart !== undefined ? selectionStart : value.length,
      selectionEnd !== undefined ? selectionEnd : value.length);
  }

  function simulateKeyPress(key: string): KeyboardEvent {
    const event = new KeyboardEvent('keypress', { key });
    spyOn(event, 'preventDefault');
    inputElement.dispatchEvent(event);
    return event;
  }

  function setFormat(maxLength: number, precision: number) {
    component.calcFormat = `${maxLength}.${precision}`;
    fixture.detectChanges();
  }
});
