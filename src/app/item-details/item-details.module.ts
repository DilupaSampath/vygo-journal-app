import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailsPageRoutingModule } from './item-details-routing.module';

import { ItemDetailsPage } from './item-details.page';
import { QuillModule } from 'ngx-quill';
import { ItemDetailsPageResolver } from './item-details.resolver';
import { FirebaseAuthService } from '../common/services/firebase-auth.service';
import { PreviewDataModule } from '../common/widgets/preview-data/preview-data.module';
import { ChipListPageModule } from '../common/widgets/chip-list/chip-list.module';
import { StickyHeaderModule } from '../common/widgets/sticky-header/sticky-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemDetailsPageRoutingModule,
    QuillModule,
    ReactiveFormsModule,
    PreviewDataModule,
    ChipListPageModule,
    StickyHeaderModule
    
  ],
  declarations: [ItemDetailsPage],
  providers: [ItemDetailsPageResolver]
})
export class ItemDetailsPageModule {}
