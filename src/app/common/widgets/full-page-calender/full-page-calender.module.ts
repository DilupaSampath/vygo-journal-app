import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPageCalenderRoutingModule } from './full-page-calender-routing.module';
import { FullPageCalenderComponent } from './full-page-calender.component';
import { NgCalendarModule } from 'ionic2-calendar';


@NgModule({
  declarations: [
    FullPageCalenderComponent
  ],
  imports: [
    CommonModule,
    FullPageCalenderRoutingModule,
    NgCalendarModule
  ],
  exports: [
    FullPageCalenderComponent
  ]
})
export class FullPageCalenderModule { }
