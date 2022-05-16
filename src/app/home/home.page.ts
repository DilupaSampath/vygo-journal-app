import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { PreviewModalHandler } from '../common/widgets/controller-actions/preview-modal.handler';
import { AbstractModalComponentHandler } from '../common/component-handlers/abstract-modal-component.handler';
import { GlobalEventHandller } from '../common/services/global-event.handller';
import { AbstractPopoverComponentHandler } from '../common/component-handlers/abstract-popover-component.handler';
import { PopoverModalHandler } from '../common/widgets/controller-actions/popover-component.handler';
import { CustomListComponent } from '../common/widgets/custom-list/custom-list.component';
import { GlobalUiEvent } from '../common/enums/global-event.enums';
import { FirebaseJournalEntryCrudService } from '../common/services/crud/firebase-journal-entry-crud.service';
import { JournalEntry } from '../common/models/journal-entry.model';
import { FirebaseFcadeService } from '../common/services/firebase-facade.service';
import { FIREBASE_COLLECTION } from '../common/enums/firebase-collection.enum';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AbstractLoadingComponentHandler } from '../common/component-handlers/abstract-loading-component.handler';
import { LoaderComponentHandeler } from '../common/widgets/controller-actions/loader-component.handler';
import { SessionStorageService } from '../common/services/session-storage.service';
import { SessionStorageEnum } from '../common/enums/session-storage.enum';
import { AlertControllerComponentHandeler } from '../common/widgets/controller-actions/alert-controller.handler';
import { AbstractAlertControllerComponentHandler } from '../common/component-handlers/abstract-alert-controller-component.handler';
import { IonicGeneralColors } from '../common/enums/ionic-general-colors.enum';
import { AbstractToastComponentHandler } from '../common/component-handlers/abstract-toast-component.handler';
import { ToastComponentHandler } from '../common/widgets/controller-actions/toast-component.handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isSearchView = false;
  isResultView = true;
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];
  userId = null;
  modal: HTMLElement;
  previewModalHandler: AbstractModalComponentHandler;
  popoverModalHandler: AbstractPopoverComponentHandler;
  loadingComponentHandler: AbstractLoadingComponentHandler;
  toastComponentHandler: AbstractToastComponentHandler;
  journalEntryArray: JournalEntry[] = [];
  reset: boolean = false;
  fieldSet: Set<string> = new Set(['date', 'description', 'tags']);
  searchValue: string = '';
  selecteDate = new Date().toDateString();
  favoriteFilter = false;
  constructor(
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
    public modalController: ModalController,
    private globalEventHandller: GlobalEventHandller,
    private popoverController: PopoverController,
    private firebaseJournalEntryCrudService: FirebaseJournalEntryCrudService,
    private firebaseFcadeService: FirebaseFcadeService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.toastComponentHandler = new ToastComponentHandler(toastController, globalEventHandller);
    // initialize loding controller
    this.loadingComponentHandler = new LoaderComponentHandeler(loadingController, globalEventHandller);

    // initialize popover controller
    this.popoverModalHandler = new PopoverModalHandler(popoverController, globalEventHandller);
    this.popoverModalHandler.component = CustomListComponent;
    this.popoverModalHandler.inputdata = new Map();
    this.popoverModalHandler.outputEvent.subscribe((data) => {
      console.log('emit popover');
    });

    // initialize modal controller
    this.previewModalHandler = new PreviewModalHandler(modalController, globalEventHandller);
    this.previewModalHandler.component = ProfilePage;
    this.previewModalHandler.inputdata = new Map();
    this.previewModalHandler.outputEvent.subscribe((data) => {
      console.log('emit modal')
    });


    // listening to global events
    globalEventHandller.$globalUiEventHandller.subscribe(data => {
      if (data && data.event == GlobalUiEvent.POPOVER_CLOSE) {
        if (data.data === 'cal-view') {
          this.fieldSet = new Set(['date']);
          this.isResultView = false;
          this.favoriteFilter = false;
          this.selecteDate = new Date().toDateString();
        } else {
          this.fieldSet = new Set(['date', 'description', 'tags']);
          this.isResultView = true;
        }
      }
    });
    this.globalEventHandller.$globalUiEventHandller.subscribe(data => {
      if (data && data.event == GlobalUiEvent.LOADER_OPEN) {
        this.loadingComponentHandler = data.data;
      }
      if (data && data.event == GlobalUiEvent.LOADER_CLOSE) {
        this.loadingComponentHandler.dismiss();
      }
    });

    // router data subscribe
    this.route.data
      .subscribe((result) => {
        let user = result['data'];
        this.userId = user.uid;
        this.getAllJurnals();
      }, (err) => { })
  }


  ngOnInit() {
    this.loadingComponentHandler.settingLoader({ message: 'Please wait..!' });
    this.getAllJurnals();
  }

  async getAllJurnals() {
    this.journalEntryArray = await this.firebaseJournalEntryCrudService.get(null);
    this.loadingComponentHandler.dismiss();
    this.globalEventHandller.triggerUiEvent(true, GlobalUiEvent.LOADER_CLOSE);
  }

  closeLoader(){
    
  }

  addFavoriteFilter(){
    this.favoriteFilter = !this.favoriteFilter;
    if(this.favoriteFilter){
      this.toastComponentHandler.settingToast({ message: 'Favorite filter added', color: IonicGeneralColors.TERTIARY });
    }
  }

  presentModal() {
    this.previewModalHandler.presentModal();
  }

  presentPopover(event) {
    this.popoverModalHandler.settingsPopover(event);
  }

  onSearch() {
    this.isSearchView = !this.isSearchView;
  }

  setInputFocus(event) {
    console.log(event);
    event.srcElement.style.backgroundColor = "white";
    this.reset = true;
  }

  setInputFocusOut(event) {
    console.log(event);
    this.reset = false;
  }

  dateSelection(event) {
    if (event && event.selectedTime) {
      this.selecteDate = event.selectedTime;
    }
  }

  successEvent(event){
    this.getAllJurnals();
  }
}
