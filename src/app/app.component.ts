import { Component, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilService } from './util.service';
import { menuController } from '@ionic/core';
import { Router } from '@angular/router';
import { GlobalEventHandller } from './common/services/global-event.handller';
import { GlobalUiEvent } from './common/enums/global-event.enums';
import { FirebaseAuthService } from './common/services/firebase-auth.service';
import { AbstractToastComponentHandler } from './common/component-handlers/abstract-toast-component.handler';
import { ToastComponentHandler } from './common/widgets/controller-actions/toast-component.handler';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;
  toastComponentHandler: AbstractToastComponentHandler;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: UtilService,
    private router: Router,
    private globalEventHandller: GlobalEventHandller,
    private firebaseAuthService : FirebaseAuthService,
    private toastController: ToastController
  ) {
    this.toastComponentHandler = new ToastComponentHandler(toastController, globalEventHandller);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.selectedIndex = 1;
    
    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
    });

    this.globalEventHandller.$globalUiEventHandller.subscribe(data=>{

      if(data && data.event === GlobalUiEvent.MAIN_MENUE_VISIBILITY){
        this.isMenuEnabled = data.data;
      }
    });
  }

  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    if(this.firebaseAuthService.currentUser){
      this.router.navigate([path]);
    }else{
      this.toastComponentHandler.settingToast({ message: 'Please login to proceed...!', color: 'light', pos: 'top', duration: 2000 });
    }

  }
  close() {
    menuController.toggle();
  }
}
