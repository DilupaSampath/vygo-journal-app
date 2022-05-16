import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';

import { ItemDetailsPage } from './item-details.page';
import { ItemDetailsPageResolver } from './item-details.resolver';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['welcome']);
const routes: Routes = [
  {
    path: '',
    component: ItemDetailsPage,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: {
      data: ItemDetailsPageResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemDetailsPageRoutingModule {}
