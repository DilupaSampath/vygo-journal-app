import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FirebaseAuthService } from '../common/services/firebase-auth.service';

@Injectable()
export class HomePageResolver implements Resolve<any> {

  constructor(private firebaseAuthService: FirebaseAuthService) {}

  resolve() {
    return this.firebaseAuthService.getProfileDataSource();
  }
}