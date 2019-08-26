import { NgCalcInputDirective } from './ng-calc-input.directive';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  template: `<input type="text" calc-input [formControl]="numberInput">`
})
class TestInputComponent { 
  numberInput = new FormControl('');

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

  it('should not allow negative key to be pressed when current position of cursor in not at the start of the line.', () => {
    const keypress = '-';
    setComponentValue('123', 2);
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).toHaveBeenCalled();
  });

  it('should not allow negative key to be pressed again when negative symbol is present.', () => {
    const keypress = '-';
    setComponentValue('-123', 0);
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).toHaveBeenCalled();
  });

  it('Should not allow more than one decimal characters', () => {
    const keypress = '.';
    setComponentValue('0.');
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).toHaveBeenCalled();
  });

  it('should not allow a zero key to be pressed when there is a value and the cursor is at the start of the line', () => {
    const keypress = '0';
    setComponentValue('120', 0, 0);
    const eventSpy = simulateKeyPress(keypress);
    expect(eventSpy.preventDefault).toHaveBeenCalled();
  });
  
    // it('should not allow more characters than max character limit', () => {
    //   const maxCharLimit = 3;
    //   _component.maxCharacters = 3;
    //   setComponentValue('123');
    //   simulateKeyPress('4');
    //   expect(_component.numericalInput.value.length).toBe(maxCharLimit);
    // });

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

  //   it('Should not allow the decimal key to print when maxPrecision is 0', () => {
  //     _component.maxPrecision = 0;
  //     setComponentValue('0');
  //     simulateKeyPress('.');
  //     expect(_component.numericalInput.value).toBe('0');
  //   });

  //   it('Should allow the decimal key to print when maxPrecision is 1', () => {
  //     _component.maxPrecision = 1;
  //     setComponentValue('0');
  //     simulateKeyPress('.');
  //     expect(_component.numericalInput.value).toBe('0.');
  //   });

  //   it('Should allow the decimal key to print when maxPrecision is 3 with multiple zeros after the decimal', () => {
  //     _component.maxPrecision = 3;
  //     setComponentValue('0.00');
  //     simulateKeyPress('1');
  //     expect(_component.numericalInput.value).toBe('0.001');
  //   });

  //   it('Should not allow the decimal key to print when maxPrecision is 3 and the 4th digit is typed behind the decimal', () => {
  //     _component.maxPrecision = 3;
  //     setComponentValue('0.001');
  //     simulateKeyPress('2');
  //     expect(_component.numericalInput.value).toBe('0.001');
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
});
