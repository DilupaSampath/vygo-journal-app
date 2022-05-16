import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AbstractAlertControllerComponentHandler } from "../../component-handlers/abstract-alert-controller-component.handler";
import { AbstractModalComponentHandler } from "../../component-handlers/abstract-modal-component.handler";
import { LocalRoutingEnum } from "../../enums/local-routes.enum";
import { SessionStorageEnum } from "../../enums/session-storage.enum";
import { FirebaseAuthService } from "../../services/firebase-auth.service";
import { FirebaseFcadeService } from "../../services/firebase-facade.service";
import { GlobalEventHandller } from "../../services/global-event.handller";
import { SessionStorageService } from "../../services/session-storage.service";
import { AlertControllerComponentHandeler } from "../controller-actions/alert-controller.handler";
@Component({
    selector: 'sticky-header',
    templateUrl: './sticky-header.component.html',
    styleUrls: ['./sticky-header.scss'],
})
  export class StickyHeaderComponent implements OnInit {
    alertControllerComponentHandeler: AbstractAlertControllerComponentHandler;
    user: any = null;
    @Input() isCreateEnable: boolean = true;
    constructor(
      private alertController: AlertController, 
      private globalEventHandller: GlobalEventHandller, 
      private firebaseFcadeService: FirebaseFcadeService,
      private router: Router,
      private sessionStorageService: SessionStorageService){
      this.alertControllerComponentHandeler = new AlertControllerComponentHandeler(alertController, globalEventHandller);
    }
    ngOnInit(): void {
      this.user = this.firebaseFcadeService.getFirebaseAuthService.getAuthata();
    }


    signOut() {
      this.firebaseFcadeService.getFirebaseAuthService.signOut().subscribe(() => {
        this.router.navigate([LocalRoutingEnum.WELCOME]);
      }, (error) => {
        console.log('signout error', error);
      });
    }
  
    signOutConfirm(){
      this.alertControllerComponentHandeler = new AlertControllerComponentHandeler(this.alertController, this.globalEventHandller);
      this.alertControllerComponentHandeler.settingAlert({ message: 'Are you sure want to logout?', subTitle:'Logout?', callback:this.signOut.bind(this)});
    }
  
    async addNewItem() {
      this.sessionStorageService.removeItemInSessionStorage(SessionStorageEnum.CURREN_JOURNAL_ENTRY_ID);
      this.router.navigate([LocalRoutingEnum.ITEM_DETAILS]);
    }
  }