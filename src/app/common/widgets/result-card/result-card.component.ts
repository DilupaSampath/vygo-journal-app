import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { AlertController, AnimationController, ModalController, PopoverController, ToastController } from "@ionic/angular";
import { DataService } from "src/app/data.service";
import { PreviewModalHandler } from "src/app/common/widgets/controller-actions/preview-modal.handler";
import { ProfilePage } from "src/app/profile/profile.page";
import { AbstractModalComponentHandler } from "../../component-handlers/abstract-modal-component.handler";
import { GlobalUiEvent } from "../../enums/global-event.enums";
import { GlobalEventHandller } from "../../services/global-event.handller";
import { PreviewDataComponent } from "../preview-data/preview-data.component";
import { JournalEntry } from "../../models/journal-entry.model";
import { GlobalDataStoreService } from "../../services/global-data-store.service";
import { Router } from "@angular/router";
import { FirebaseJournalEntryCrudService } from "../../services/crud/firebase-journal-entry-crud.service";
import { FirebaseCrudUtil } from "../../util/firebase-crud.util";
import firebase from "firebase";
import { SessionStorageService } from "../../services/session-storage.service";
import { SessionStorageEnum } from "../../enums/session-storage.enum";
import { AlertControllerComponentHandeler } from "../controller-actions/alert-controller.handler";
import { ControllerActionInputData } from "../../enums/controller-action-input-data.enum";
import { AbstractToastComponentHandler } from "../../component-handlers/abstract-toast-component.handler";
import { ToastComponentHandler } from "../controller-actions/toast-component.handler";
@Component({
  selector: 'result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.scss'],
})
export class CustomListComponent implements OnInit, OnDestroy {
  @Input() resultItem: JournalEntry = null;
  @Output() successEvent: EventEmitter<any> = new EventEmitter();

  categories = [];
  previewModalHandler: AbstractModalComponentHandler;
  alertControllerComponentHandeler: AlertControllerComponentHandeler;
  isReadMore = true;
  toastComponentHandler: AbstractToastComponentHandler;
  
  showText(id) {
    this.animationCtrl.create()
    .addElement(document.getElementById(id))
    .duration(1500)
    .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', '1', '0.2');
    this.isReadMore = !this.isReadMore
  }
  constructor(
    public modalController: ModalController,
    private globalEventHandller: GlobalEventHandller,
    private data: DataService,
    private globalDataStoreService: GlobalDataStoreService,
    private router: Router,
    private firebaseJournalEntryCrudService: FirebaseJournalEntryCrudService,
    private sessionStorageService: SessionStorageService,
    private animationCtrl: AnimationController,
    protected alertController: AlertController,
    private toastController: ToastController) {
      this.toastComponentHandler = new ToastComponentHandler(toastController, globalEventHandller);
    this.alertControllerComponentHandeler = new AlertControllerComponentHandeler(alertController, globalEventHandller);

    this.globalEventHandller.$globalUiEventHandller.subscribe(data => {
      if (data && data.event == GlobalUiEvent.CONFRIM_DIALOG) {
        this.alertControllerComponentHandeler = data.data;
      }
    });

    this.alertControllerComponentHandeler.outputEvent.subscribe(data=>{
      if(data && data === 'CONFIRM'){
      }

    });
  }
  ngOnDestroy(): void {
    if(this.alertControllerComponentHandeler.outputEvent && !this.alertControllerComponentHandeler.outputEvent.closed){}
    this.alertControllerComponentHandeler.outputEvent.unsubscribe();
  }
  ngOnInit(): void {
    this.categories = this.data.getCategories()
  }

  presentModal() {
    this.previewModalHandler = new PreviewModalHandler(this.modalController, this.globalEventHandller);
    this.previewModalHandler.component = PreviewDataComponent;
    let prv = new Map();
    prv.set('contentData', this.resultItem.description);
    prv.set('modalHandler', this.previewModalHandler);
    prv.set(ControllerActionInputData.CSS_CLASS, 'my-custom-modal-css');
    this.previewModalHandler.inputdata = prv;
    this.previewModalHandler.outputEvent.subscribe((data) => {
      console.log('emit modal')
    });
    this.previewModalHandler.presentModal();
  }


  myFunction() {
    let dots = document.getElementById("dots");
    let moreText = document.getElementById("more");
    let btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }

  async editItem() {
    this.globalDataStoreService.addItem('CURRENT_JOURNAL_ENTRY', this.resultItem._id);
    this.router.navigate(['/item-details']);
    this.sessionStorageService.addItemToSessionStorage(SessionStorageEnum.CURREN_JOURNAL_ENTRY_ID, this.resultItem._id);
    this.firebaseJournalEntryCrudService.valueChanges();
  }

  deleteConfirm(){
    this.alertControllerComponentHandeler.settingAlert({ message: 'Are you sure want to delete this journal?', subTitle:'Delete?', callback:this.deleteItem.bind(this) })
  }

  async deleteItem(){
    let data = await this.firebaseJournalEntryCrudService.delete(this.resultItem._id);    
    console.log(data);
    this.firebaseJournalEntryCrudService.valueChanges();
    this.toastComponentHandler.settingToast({ message: 'Successfully deleted', color: 'success' });
    this.successEvent.emit(true);
  }

}