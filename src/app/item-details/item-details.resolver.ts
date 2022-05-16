import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { GlobalUiEvent } from '../common/enums/global-event.enums';
import { SessionStorageEnum } from '../common/enums/session-storage.enum';
import { FirebaseAuthService } from '../common/services/firebase-auth.service';
import { GlobalDataStoreService } from '../common/services/global-data-store.service';
import { GlobalEventHandller } from '../common/services/global-event.handller';
import { SessionStorageService } from '../common/services/session-storage.service';

@Injectable()
export class ItemDetailsPageResolver implements Resolve<any> {

  constructor(private firebaseAuthService: FirebaseAuthService, 
    private globalEventHandller: GlobalEventHandller,
    private sessionStorageService: SessionStorageService) {}

  resolve() {

    const item = this.sessionStorageService.getItemInSessionStorage(SessionStorageEnum.CURREN_JOURNAL_ENTRY_ID);
    const resData = {
      currentJournalEntry: item,
      authProfile: this.firebaseAuthService.getAuthata()
    }

    this.globalEventHandller.triggerUiEvent(false, GlobalUiEvent.MAIN_MENUE_VISIBILITY);
    return resData;
  }
  
}