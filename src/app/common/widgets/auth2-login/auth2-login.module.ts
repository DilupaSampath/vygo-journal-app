import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Auth2LoginPage } from './auth2-login.page';
import { Auth2LoginPageRoutingModule } from './auth2-login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Auth2LoginPageRoutingModule
  ],
  declarations: [Auth2LoginPage],
  exports: [Auth2LoginPage]
})
export class Auth2LoginPageModule {}
