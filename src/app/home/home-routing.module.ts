import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomePageResolver } from './home.page.resolver';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: {
      data: HomePageResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
