import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LocalRoutingEnum } from './common/enums/local-routes.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: LocalRoutingEnum.WELCOME,
    pathMatch: 'full'
  },
  {
    path: LocalRoutingEnum.WELCOME,
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: LocalRoutingEnum.LOGIN,
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: LocalRoutingEnum.SIGNUP,
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: LocalRoutingEnum.HOME,
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: LocalRoutingEnum.ITEM_DETAILS,
    loadChildren: () => import('./item-details/item-details.module').then( m => m.ItemDetailsPageModule)
  },
  {
    path: LocalRoutingEnum.PROFILE,
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
