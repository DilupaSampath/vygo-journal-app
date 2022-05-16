import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ChipListPage } from './chip-list.page';
import { ChipListPageRoutingModule } from './chip-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChipListPageRoutingModule
  ],
  declarations: [ChipListPage],
  exports: [ChipListPage]
})
export class ChipListPageModule {}
