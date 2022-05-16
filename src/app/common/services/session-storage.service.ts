import { Injectable } from "@angular/core";
import { SessionStorageEnum } from "../enums/session-storage.enum";

@Injectable({
    providedIn: 'root'
  })
  export class SessionStorageService {


    addItemToSessionStorage(key: SessionStorageEnum, value){
        const encodedData = btoa(value);
        sessionStorage.setItem(key.toString(), encodedData);
    }

    getItemInSessionStorage(key: SessionStorageEnum){
        const encodedData = sessionStorage.getItem(key.toString());
        const decodedData = encodedData ? atob(encodedData) : null;
        return decodedData;
    }

    removeItemInSessionStorage(key: SessionStorageEnum){
        sessionStorage.removeItem(key.toString());
    }

  }