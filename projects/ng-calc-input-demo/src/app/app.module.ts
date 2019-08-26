import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgCalcInputModule } from 'projects/ng-calc-input/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgCalcInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
