import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, Animation, AnimationController, LoadingController, ToastController } from '@ionic/angular';
import Quill from 'quill';
import { AbstractLoadingComponentHandler } from '../common/component-handlers/abstract-loading-component.handler';
import { FIREBASE_COLLECTION } from '../common/enums/firebase-collection.enum';
import { GlobalUiEvent } from '../common/enums/global-event.enums';
import { RequestMethodEnum } from '../common/enums/request-method.model';
import { ApiRequestDataModel } from '../common/models/api-request-data.model';
import { AuthDataModel } from '../common/models/auth-data.model';
import { JournalEntry } from '../common/models/journal-entry.model';
import { QueryObjectModel } from '../common/models/query-object.model';
import { FileUploadHandler } from '../common/services/file-upload.handler';
import { FirebaseAuthService } from '../common/services/firebase-auth.service';
import { FirebaseFcadeService } from '../common/services/firebase-facade.service';
import { GlobalEventHandller } from '../common/services/global-event.handller';
import { QuillConfiguration } from '../common/util/quill-configuration.util';
import { LoaderComponentHandeler } from '../common/widgets/controller-actions/loader-component.handler';
import { FirebaseJournalEntryCrudService } from '../common/services/crud/firebase-journal-entry-crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractToastComponentHandler } from '../common/component-handlers/abstract-toast-component.handler';
import { ToastComponentHandler } from '../common/widgets/controller-actions/toast-component.handler';
import { FirebaseCrudUtil } from '../common/util/firebase-crud.util';
import firebase from "firebase";
import { SessionStorageService } from '../common/services/session-storage.service';
import { SessionStorageEnum } from '../common/enums/session-storage.enum';
import { IFileImageContentInterface } from '../common/interfaces/file-image-content.interface';
import { LocalRoutingEnum } from '../common/enums/local-routes.enum';
import { IonicGeneralColors } from '../common/enums/ionic-general-colors.enum';
import { AlertControllerComponentHandeler } from '../common/widgets/controller-actions/alert-controller.handler';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit, OnDestroy {
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  editorForm: FormGroup;
  contentData: string = '';
  isEdit = true;
  modules = {};
  quillInstanse: any = null;
  oldQuill = null;
  newQuill = null;
  private quillConfiguration: QuillConfiguration;
  loadingComponentHandler: AbstractLoadingComponentHandler;
  toastComponentHandler: AbstractToastComponentHandler;
  alertControllerComponentHandeler: AlertControllerComponentHandeler;
  navigationData: any = null;
  date = new Date();
  currentJournalData: JournalEntry = null;
  chipListSet: Set<string> = new Set();
  isFavorite = false;
  ioStringate: string;
  isFileUploading: boolean = false;
  constructor(
    private globalEventHandller: GlobalEventHandller,
    private firebaseCrudService: FirebaseJournalEntryCrudService,
    private fileUploadHandler: FileUploadHandler,
    private firebaseAuthService: FirebaseAuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseJournalEntryCrudService: FirebaseJournalEntryCrudService,
    private sessionStorageService: SessionStorageService,
    private alertController: AlertController
  ) {
    // intialize object to handle current state of the data
    this.currentJournalData = new JournalEntry(firebaseAuthService)
    this.currentJournalData.date = new Date();
    this.ioStringate = this.currentJournalData.date.toISOString();
    // quill setup
    this.quillConfiguration = new QuillConfiguration();
    this.modules = this.quillConfiguration.getConfig(globalEventHandller);
    this.quillConfiguration.importIcons(Quill);

    // loding controller initilize
    this.loadingComponentHandler = new LoaderComponentHandeler(loadingController, globalEventHandller);

    // intialize toast controller
    this.toastComponentHandler = new ToastComponentHandler(toastController, globalEventHandller);

    // listening to global events
    this.globalEventHandller.$globalUiEventHandller.subscribe(data => {
      if (data && data.event == GlobalUiEvent.LOADER_OPEN) {
        this.loadingComponentHandler = data.data;
      }
    });

    // router data subscribe
    this.route.data
      .subscribe((result) => {
        this.navigationData = result['data'];
        if (this.navigationData && this.navigationData.currentJournalEntry) {
              this.loadingComponentHandler.settingLoader({ message: 'Please wait..!' });
          this.getItem(this.navigationData.currentJournalEntry);
        }
      }, (err) => { })
  }

  
  ngOnDestroy(): void {
    this.globalEventHandller.triggerUiEvent(true, GlobalUiEvent.MAIN_MENUE_VISIBILITY);
    this.fileUploadHandler.clearCurrentUploadImageMap();
  }

  ngOnInit() {
    // subscribe to file upload event
    this.globalEventHandller.$globalUiEventHandller.subscribe(data => {
      if (data && data.event == GlobalUiEvent.FILE_UPLOAD) {
        console.log(data);
        this.isFileUploading = true;
        this.fileUploadHandler.uploadFile(data.data[0], this.quillInstanse, this.fileUploadLoaderOff.bind(this));
      }
    });
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
    this.activeVariation = 'size';
  }

  fileUploadLoaderOff(){
    this.isFileUploading = false;
  }

  /**
   * handle selecte tag event data
   * @param eventData - selected tags array
   */
  tagSelectEvent(eventData){
    this.currentJournalData.tags = eventData;
  }

  /**
   * keep quill instance
   * @param quill 
   */
  onEditorCreated(quill) {
    this.quillInstanse = quill;
  }

  /**
   * handle quill content change data
   * @param data 
   */
  changeContent(data) {
    this.contentData = data.html;
  }
/**
   * 
   * @param e 
   */
 segmentChanged(e: any) {
  this.isEdit = !this.isEdit;
}

  /**
   * image and file handle
   * @param event 
   */
  onFilesChanged(event) {
    const inputElement: any = document.getElementsByClassName("ql-image")[0];
    inputElement.addEventListener("change", function handleFiles(data) {
    }, false);
  }

  /**
   * load data from firebase by given id
   * @param id firebase id
   */
  async getItem(id) {
    const queryObjectModel = FirebaseCrudUtil.generateQueryObjectModel(firebase.firestore.FieldPath.documentId(), id, '==');
    let data = await this.firebaseJournalEntryCrudService.getById(queryObjectModel);
    this.chipListSet = new Set(data.tags);
    this.currentJournalData = data;
    this.isFavorite = this.currentJournalData.isfavorite;
    this.editorForm.get('editor').patchValue(data.description);
    this.loadingComponentHandler.dismiss();
    this.updateCurrentImageMap(this.currentJournalData.images);
  }

  /**
   * set current state of the image map array when image upload event occured
   * @param images image array with md5 hash and url
   */
  updateCurrentImageMap(images: IFileImageContentInterface[]){
    images.forEach(element=>{

      const uploaedItem: IFileImageContentInterface = {url: element.url, md5Hash: element.md5Hash};
      this.fileUploadHandler.addItemToCurrentUplodedFilesMap(element.md5Hash , uploaedItem);
    });
  }

  /**
   * update the isFavorite state and update the current selected item's isFavorite status when user click on save button
   */
  markAsFavorite(){
    this.isFavorite = !this.isFavorite;
    if(this.isFavorite){
      this.toastComponentHandler.settingToast({ message: 'Marked as favorite', color: IonicGeneralColors.MEDIUM, pos: 'middle', duration: 2000 });

    }
  }

  /**
   * to capcture the user selected date
   * @param event ionic input change event
   */
  dateChanged(event){
    console.log(event);
    this.currentJournalData.date = new Date(event.detail.value);
    this.ioStringate = this.currentJournalData.date.toISOString();
  }

  /**
   * when user perform save event, we have to extract the images store in _currentUplodedFilesMap. and convert that accordingly
   * to create savable object
   */
  async save(): Promise<any> {
    this.loadingComponentHandler.settingLoader({ message: 'Please wait..!' });
    const images = [];
    [...this.fileUploadHandler.getCurrentUplodedFilesMap().values()].forEach((data) => {
      images.push({md5Hash: data.md5Hash,url : data.url});
    });

    const apiRequestDataModel = new ApiRequestDataModel<JournalEntry>();
    apiRequestDataModel.collection = FIREBASE_COLLECTION.JOURNAL_ENTRY;
    apiRequestDataModel.method = RequestMethodEnum.POST;

    const journalEntry = new JournalEntry(this.firebaseAuthService);
    journalEntry.description = this.contentData;
    journalEntry.images = images;
    journalEntry.tags = this.currentJournalData.tags ? this.currentJournalData.tags : [];
    journalEntry.date = this.currentJournalData.date ? this.currentJournalData.date : new Date();
    journalEntry.isfavorite = this.isFavorite

    apiRequestDataModel.setPayload(journalEntry);

    const result = await this.firebaseCrudService.insertItem(apiRequestDataModel);
    this.loadingComponentHandler.dismiss();
    this.router.navigate([LocalRoutingEnum.HOME]);
    this.toastComponentHandler.settingToast({ message: 'Successfully created', color: IonicGeneralColors.SUCCESS });
  }

  async update(): Promise<any> {
    const images: IFileImageContentInterface[] = [];
    [...this.fileUploadHandler.getCurrentUplodedFilesMap().values()].forEach((data) => {
      images.push({md5Hash: data.md5Hash,url : data.url});
    });
    this.loadingComponentHandler = new LoaderComponentHandeler(this.loadingController, this.globalEventHandller);
    this.loadingComponentHandler.settingLoader({ message: 'Please wait..!' });
    // const images = [];
    // [...this.fileUploadHandler.getCurrentUplodedFilesMap().values()].forEach((data) => {
    //   images.push(data.url);
    // });
    const apiRequestDataModel = new ApiRequestDataModel<JournalEntry>();
    apiRequestDataModel.collection = FIREBASE_COLLECTION.JOURNAL_ENTRY;
    apiRequestDataModel.method = RequestMethodEnum.PUT;

    const journalEntry = new JournalEntry(this.firebaseAuthService);
    journalEntry.description = this.contentData;
    journalEntry.images = images;
    journalEntry.tags = this.currentJournalData.tags;
    journalEntry.date = this.currentJournalData.date;
    journalEntry._id = this.navigationData.currentJournalEntry;
    journalEntry.isfavorite = this.isFavorite;
    apiRequestDataModel.setPayload(journalEntry);

    const result = await this.firebaseCrudService.update(journalEntry);

    console.log(result);
    this.loadingComponentHandler.dismiss();
    this.sessionStorageService.removeItemInSessionStorage(SessionStorageEnum.CURREN_JOURNAL_ENTRY_ID);
    this.router.navigate([LocalRoutingEnum.HOME]);
    this.toastComponentHandler.settingToast({ message: 'Successfully updated', color: IonicGeneralColors.SUCCESS });
  }

  cancel(){
    this.router.navigate([LocalRoutingEnum.HOME]);
  }
  cancelConfirm(){
    this.alertControllerComponentHandeler = new AlertControllerComponentHandeler(this.alertController, this.globalEventHandller);
    this.alertControllerComponentHandeler.settingAlert({ message: 'Are you sure you want to cancel this?', subTitle:'Delete?', callback:this.cancel.bind(this) })
  }

}


