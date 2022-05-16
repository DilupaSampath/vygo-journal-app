import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import firebase from "firebase/app";
import { environment } from "src/environments/environment";
import { AbstractToastComponentHandler } from "../component-handlers/abstract-toast-component.handler";
import { IonicGeneralColors } from "../enums/ionic-general-colors.enum";
import { IFileImageContentInterface } from "../interfaces/file-image-content.interface";
import { ToastComponentHandler } from "../widgets/controller-actions/toast-component.handler";
import { FirebaseFcadeService } from "./firebase-facade.service";
import { GlobalEventHandller } from "./global-event.handller";

@Injectable({
    providedIn: 'root'
  })
export class FileUploadHandler{
 // to keep track current uploaded images and handle duplication
private _currentUplodedFilesMap = new Map<string, IFileImageContentInterface>();    
toastComponentHandler: AbstractToastComponentHandler;

    constructor(
      private firebaseFcadeService: FirebaseFcadeService,
      private toastController: ToastController,
      private globalEventHandller: GlobalEventHandller){
      this.toastComponentHandler = new ToastComponentHandler(toastController, globalEventHandller);
    }


addItemToCurrentUplodedFilesMap(key, value: IFileImageContentInterface){
    this._currentUplodedFilesMap.set(key, value);
}

getCurrentUplodedFilesMap(){
    return this._currentUplodedFilesMap;
}

clearCurrentUploadImageMap(){
  this._currentUplodedFilesMap.clear();
}
/**
 * 
 * @param image image reference
 * @param quillInstanse quill reference, after uploading this image we have to update the eitor with uploded image
 */
uploadFile(image, quillInstanse, callback){

    if (image) {
      const storageRef = this.firebaseFcadeService.getFirestoreReference.ref(environment.firebase.imageUploadBucket);
      const imageRef = storageRef.child(image.name);
      imageRef.put(image)
     //5.
     .then((dataF: any) => {

        const storageRef = this.firebaseFcadeService.getFirestoreReference.ref(environment.firebase.imageUploadBucket);
        //3.
        const imageRef = storageRef.child(image.name);
        //4.
        imageRef.getDownloadURL().then((dataS: any) => {
          if((dataF && dataF.metadata && dataF.metadata.md5Hash) && !(this._currentUplodedFilesMap.has(dataF.metadata.md5Hash))){
            this._currentUplodedFilesMap.set(dataF.metadata.md5Hash, {md5Hash: dataF.metadata.md5Hash, url:dataS});
          }
          if((dataF && dataF.metadata && dataF.metadata.md5Hash)){
            this.insertToEditor(dataS,quillInstanse);
            callback();
            this.toastComponentHandler.settingToast({ message: 'Image uploaded successfully', color: IonicGeneralColors.SUCCESS });
          }
      });
    });
    } else {
      callback();
      alert("Please upload an image first.");
    }
  }

  insertToEditor(url: string, quillInstanse) {
    // push image url to rich editor.
    const range = quillInstanse.getSelection();
    quillInstanse.insertEmbed(range.index, 'image', url);
  }
}