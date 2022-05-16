import { Component, EventEmitter, Inject, Input, LOCALE_ID, NgZone, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/util.service';
import { AbstractToastComponentHandler } from '../../component-handlers/abstract-toast-component.handler';

import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { GlobalEventHandller } from '../../services/global-event.handller';
import { ToastComponentHandler } from '../controller-actions/toast-component.handler';

@Component({
  selector: 'auth2-login',
  templateUrl: './auth2-login.page.html',
  styleUrls: ['./auth2-login.page.scss'],
})
export class Auth2LoginPage implements OnInit {
  authRedirectResult: Subscription;
  toastComponentHandler: AbstractToastComponentHandler;
  constructor(
    private util: UtilService,
    private navCtrl: NavController, 
    public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private authService: FirebaseAuthService,
    private globalEventHandller: GlobalEventHandller,
    private toastController: ToastController
  ) {
    this.toastComponentHandler = new ToastComponentHandler(toastController, globalEventHandller);

    // Get firebase authentication redirect result invoken when using signInWithRedirect()
    // signInWithRedirect() is only used when client is in web but not desktop
    this.authRedirectResult = this.authService.$redirectResult
    .subscribe(result => {
      if (result.user) {
        // this.redirectLoggedUserToProfilePage();
        let navigationExtras: NavigationExtras = {
          queryParams: {
            special: JSON.stringify(result.user)
          }
        };
        this.router.navigate(['home'], navigationExtras);
      } else if (result.error) {
      }
    });
   }

  ngOnInit() {
  }


   // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // redirect the user to the profile page
  redirectLoggedUserToProfilePage() {
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate(['profile']);
    });
  }


  facebookSignIn() {
    if(false){
      this.authService.signInWithFacebook()
      .then((result: any) => {
        if (result.additionalUserInfo) {
          this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
        }
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const token = result.credential.accessToken;
        // The signed-in user info is in result.user;
        this.redirectLoggedUserToProfilePage();
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
    }else{
      this.toastComponentHandler.settingToast({ message: 'Feature not implemented', color: 'light', pos: 'top', duration: 2000 });
    }
    
  }

  googleSignIn() {
    this.authService.signInWithGoogle()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
      }
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
      // let navigationExtras: NavigationExtras = {
      //   queryParams: {
      //     special: JSON.stringify(result.user)
      //   }
      // };
      // this.router.navigate(['profile'], navigationExtras);
      this.util.setMenuState(true);
      this.navCtrl.navigateRoot('/home', { animationDirection: 'forward' });
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }

  twitterSignIn() {
    if(false){
      this.authService.signInWithTwitter()
      .then((result: any) => {
        if (result.additionalUserInfo) {
          this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
        }
        // This gives you a Twitter Access Token. You can use it to access the Twitter API.
        // const token = result.credential.accessToken;
        // The signed-in user info is in result.user;
        this.redirectLoggedUserToProfilePage();
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
    }else{

      this.toastComponentHandler.settingToast({ message: 'Feature not implemented', color: 'light', pos: 'top', duration: 2000 });
    }
  }

}
