import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ResultCardRoutingModule } from './result-card-routing.module';
import { CustomListComponent } from './result-card.component';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';


@NgModule({
  declarations: [CustomListComponent, CustomDatePipe],
  imports: [
    CommonModule,
    ResultCardRoutingModule,
  ],
  exports:[CustomListComponent]
})
export class ResultCardModule { }
