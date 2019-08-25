import { NgModule } from '@angular/core';
import { NgCalcInputDirective } from './ng-calc-input.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgCalcInputDirective],
  imports: [
    CommonModule
  ],
  exports: [NgCalcInputDirective]
})
export class NgCalcInputModule { }
