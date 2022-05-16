import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyHeaderComponent } from './sticky-header.component';
import { StickyHeaderRoutingModule } from './sticky-header-routing.module';



@NgModule({
  declarations: [StickyHeaderComponent],
  imports: [
    CommonModule,
    StickyHeaderRoutingModule
  ],
  exports:[StickyHeaderComponent]
})
export class StickyHeaderModule { }
