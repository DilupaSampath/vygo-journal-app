import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GlobalUiEvent } from '../common/enums/global-event.enums';
import { FirebaseAuthService } from '../common/services/firebase-auth.service';
import { GlobalEventHandller } from '../common/services/global-event.handller';
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
    private authService: FirebaseAuthService,
    private globalUiEventHandller: GlobalEventHandller) { }

  ngOnInit() {
    this.route.data
      .subscribe((result) => {
      if(result){
        this.user = result.data;
      }
    }, (err) => {})

  }
  diss(){
    this.globalUiEventHandller.triggerUiEvent(true, GlobalUiEvent.MODAL_CLOSE);
    // this.viewController.dismiss(true);
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
