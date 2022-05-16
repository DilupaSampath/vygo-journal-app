import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import firebase from "firebase/app";
import { AbstractToastComponentHandler } from "../component-handlers/abstract-toast-component.handler";
import { ToastComponentHandler } from "../widgets/controller-actions/toast-component.handler";
import { FirebaseFcadeService } from "./firebase-facade.service";
import { GlobalEventHandller } from "./global-event.handller";

@Injectable({
    providedIn: 'root'
  })
export class FileUploadHandler{
 
    constructor(
      private firebaseFcadeService: FirebaseFcadeService,
      private toastController: ToastController,
      private globalEventHandller: GlobalEventHandller){
      this.toastComponentHandler = new ToastComponentHandler(toastController, globalEventHandller);
    }
private _currentUplodedFilesMap = new Map<string, any>();    
toastComponentHandler: AbstractToastComponentHandler;

addItemToCurrentUplodedFilesMap(key, value){
    this._currentUplodedFilesMap.set(key, value);
}

getCurrentUplodedFilesMap(){
    return this._currentUplodedFilesMap;
}

uploadFile(image, quillInstanse){

    if (image) {
      const storageRef = this.firebaseFcadeService.getFirestoreReference.ref('/journal_images');
      const imageRef = storageRef.child(image.name);
      imageRef.put(image)
     //5.
     .then((dataF: any) => {

        const storageRef = this.firebaseFcadeService.getFirestoreReference.ref('/journal_images');
        //3.
        const imageRef = storageRef.child(image.name);
        //4.
        imageRef.getDownloadURL().then((dataS: any) => {
          if((dataF && dataF.metadata && dataF.metadata.md5Hash) && !(this._currentUplodedFilesMap.has(dataF.metadata.md5Hash))){
            this._currentUplodedFilesMap.set(dataF.metadata.md5Hash, {md5Hash: dataF.metadata.md5Hash, url:dataS});
          }
          if((dataF && dataF.metadata && dataF.metadata.md5Hash)){
            this.insertToEditor(dataS,quillInstanse);
            this.toastComponentHandler.settingToast({ message: 'Image uploaded successfully', color: 'success' });
          }
      });
    });
    } else {
      alert("Please upload an image first.");
    }
  }

  insertToEditor(url: string, quillInstanse) {
    // push image url to rich editor.
    const range = quillInstanse.getSelection();
    quillInstanse.insertEmbed(range.index, 'image', url);
  }
}