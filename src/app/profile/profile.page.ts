import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FirebaseAuthService } from '../common/services/firebase-auth.service';
import { ProfileModel } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: ProfileModel;
  modalController: ModalController
  constructor(    
    private router: Router,
    private route: ActivatedRoute,
    private authService: FirebaseAuthService) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe((result) => {
      if(result){
        // this.user = JSON.parse(result.special);
      }
    }, (err) => {})

  }
  signOut() {
    this.authService.signOut().subscribe(() => {
      // Sign-out successful.
      this.router.navigate(['sign-in']);
    }, (error) => {
      console.log('signout error', error);
    });
  }
}
