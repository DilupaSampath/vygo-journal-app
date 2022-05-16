import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewDataRoutingModule } from './preview-data-routing.module';
import { PreviewDataComponent } from './preview-data.component';


@NgModule({
  declarations: [PreviewDataComponent],
  imports: [
    CommonModule,
    PreviewDataRoutingModule
  ],
  exports:[PreviewDataComponent]
})
export class PreviewDataModule { }
