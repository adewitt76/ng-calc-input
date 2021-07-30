# NgCalcInput

NgCalcInput is a simple input that allows only for the input numbers at the given precision.

## Installation

    $ npm i ng-calc-input

## Example Usage

app.component.html:
~~~html
<label>
  Number:
  <input type="text" calc-input="5.3" [formControl]="numberInput" (keyup)="test($event)">
</label>
<p>Value: {{ numberInput.value }}</p>
~~~

app.component.ts:
~~~javascript
export class AppComponent {
  title = 'ng-calc-input-demo';
  numberInput = new FormControl('0');

  public test(event: Event) {
    console.log(event);
  }
}
~~~

Styling is left up to the consumer.

Input type must be "text". The first number is the number of allowed characters before the decimal. The second number is the precision after the decimal.

So the above code will only allow a number like: 55555.333
