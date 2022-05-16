import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LocalRoutingEnum } from '../common/enums/local-routes.enum';
import { FirebaseAuthService } from '../common/services/firebase-auth.service';
import { UtilService } from '../util.service';
import { ConfirmedValidator } from './must-match.helper';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signInForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm password is required.' },
      { type: 'MustMatch', message: 'Password not matching' }
    ]
  };;
  formSignUp: FormGroup = new FormGroup({});
  constructor(    
    private util: UtilService,
    private navCtrl: NavController, 
    public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private authService: FirebaseAuthService,
    private fb: FormBuilder) { 


      this.formSignUp = fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { 
        validator: ConfirmedValidator('password', 'confirmPassword')
      })
    }

  ngOnInit() {
    // this.formSignUp.get().errors.
  }


  signUpWithEmail() {
    this.authService.signUpWithEmail(this.formSignUp.value['email'], this.formSignUp.value['password'])
    .then(user => {
      this.authService.updateUserName(this.formSignUp.value['name']).then(data=>{
        this.util.setMenuState(true);
        this.navCtrl.navigateRoot(LocalRoutingEnum.HOME, { animationDirection: 'forward' });
      }).catch(function(error) {
        this.util.setMenuState(true);
        this.navCtrl.navigateRoot(LocalRoutingEnum.HOME, { animationDirection: 'forward' });
      });;

    })
    .catch(error => {
      this.submitError = error.message;
    });
  }
}
