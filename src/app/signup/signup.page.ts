import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from '../common/services/firebase-auth.service';
import { UtilService } from '../common/util/util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signInForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };
  constructor(    private util: UtilService,
    private navCtrl: NavController, 
    public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private authService: FirebaseAuthService) {
      this.signInForm = new FormGroup({
        'email': new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        'password': new FormControl('', Validators.compose([
          Validators.minLength(6),
          Validators.required
        ]))
      });
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
          this.router.navigate(['profile'], navigationExtras);
        } else if (result.error) {
          this.submitError = result.error;
        }
      });
     }

  ngOnInit() {
  }
  redirectLoggedUserToProfilePage() {
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate(['profile']);
    });
  }
  

  signInWithEmail() {
    this.authService.signUpWithEmail(this.signInForm.value['email'], this.signInForm.value['password'])
    .then(user => {
      // navigate to user profile
      // this.redirectLoggedUserToProfilePage();
          this.util.setMenuState(true);
    this.navCtrl.navigateRoot('/home', { animationDirection: 'forward' });
    })
    .catch(error => {
      this.submitError = error.message;
    });
  }
}
