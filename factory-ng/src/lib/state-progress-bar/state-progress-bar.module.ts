import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarModule } from 'primeng/progressbar';

import { StateProgressBarComponent } from './state-progress-bar.component';



@NgModule({
  declarations: [
    StateProgressBarComponent
  ],
  imports: [
    CommonModule,
    ProgressBarModule
  ],
  exports: [
    StateProgressBarComponent
  ]
})
export class StateProgressBarModule { }
