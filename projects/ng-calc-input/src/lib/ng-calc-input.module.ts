import { NgModule } from '@angular/core';
import { NgCalcInputDirective } from './ng-calc-input.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NgCalcInputDirective],
  imports: [
    CommonModule
  ],
  exports: [NgCalcInputDirective]
})
export class NgCalcInputModule { }
