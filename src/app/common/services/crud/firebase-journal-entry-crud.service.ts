import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { FIREBASE_COLLECTION } from "src/app/common/enums/firebase-collection.enum";
import { RequestMethodEnum } from "src/app/common/enums/request-method.model"; import { JournalEntry } from "src/app/common/models/journal-entry.model";
;
import { QueryObjectModel } from "src/app/common/models/query-object.model";
import { FirebaseFcadeService } from "src/app/common/services/firebase-facade.service";
import { ApiRequestDataModel } from "../../models/api-request-data.model";
import { FirebaseCrudUtil } from "../../util/firebase-crud.util";

@Injectable({
  providedIn: 'root'
})
export class FirebaseJournalEntryCrudService {

  constructor(private firebaseFcadeService: FirebaseFcadeService) { }

  async insertItem(requestData: ApiRequestDataModel<JournalEntry>): Promise<any> {
    return this.firebaseFcadeService.saveItem(requestData);
  }

  async get(condition: QueryObjectModel[]): Promise<any> {
    const requestData: ApiRequestDataModel<QueryObjectModel[]> = new ApiRequestDataModel();
    requestData.collection = FIREBASE_COLLECTION.JOURNAL_ENTRY;
    requestData.method = RequestMethodEnum.GET;
    if (condition && condition.length > 0) {
      requestData.setCondition(condition);
    } else {
      requestData.setCondition([]);
    }
    let journalEntryArray: JournalEntry[] = [];

    let result: firebase.firestore.QuerySnapshot = await this.firebaseFcadeService.get(requestData);
    if (result && result.docs && result.docs.length > 0) {
      result.docs.forEach(element => {
        const elementData = element.data();
        const journalEntry = new JournalEntry(null);
        journalEntry.author = elementData.author;
        journalEntry.description = elementData.description;
        journalEntry.images = elementData.images;
        journalEntry.shortTitle = elementData.shortTitle;
        journalEntry.tags = elementData.tags;
        journalEntry.date = elementData.date;
        journalEntry.isfavorite = elementData.isfavorite;
        journalEntry._id = element.id;
        journalEntryArray.push(journalEntry);
      });
    }
    journalEntryArray = journalEntryArray.slice().sort((a: any, b: any) => { return (new Date(b.date).getTime() - new Date(a.date).getTime()) })
    console.log(journalEntryArray);
    return journalEntryArray;
  }

  async update(entry: JournalEntry): Promise<any> {
    const requestData: ApiRequestDataModel<JournalEntry> = new ApiRequestDataModel();
    requestData.collection = FIREBASE_COLLECTION.JOURNAL_ENTRY;
    requestData.method = RequestMethodEnum.PUT;
    requestData.setPayload(entry);
    return this.firebaseFcadeService.updateItem<JournalEntry>(requestData);
  }

  async delete(id: string) {
    const requestData: ApiRequestDataModel<JournalEntry> = new ApiRequestDataModel();
    requestData.collection = FIREBASE_COLLECTION.JOURNAL_ENTRY;
    requestData.method = RequestMethodEnum.DELETE;

    const journalEntry = new JournalEntry(this.firebaseFcadeService.getFirebaseAuthService);
    journalEntry._id = id;
    requestData.setPayload(journalEntry);

    let result = await this.firebaseFcadeService.delete(requestData);

    return result;
  }

  async getById(condition: QueryObjectModel) {
    const requestData: ApiRequestDataModel<QueryObjectModel[]> = new ApiRequestDataModel();
    requestData.collection = FIREBASE_COLLECTION.JOURNAL_ENTRY;
    requestData.method = RequestMethodEnum.GET;
    requestData.setCondition([condition]);
    let result: firebase.firestore.QuerySnapshot = await this.firebaseFcadeService.getById(requestData);

    if (result && result.docs && result.docs.length > 0) {
      const elementData = result.docs[0].data();
      const journalEntry = new JournalEntry(null);
      journalEntry.author = elementData.author;
      journalEntry.description = elementData.description;
      journalEntry.images = elementData.images;
      journalEntry.shortTitle = elementData.shortTitle;
      journalEntry.tags = elementData.tags;
      journalEntry.date = elementData.date;
      journalEntry.isfavorite = elementData.isfavorite;
      journalEntry._id = elementData.id;
      return journalEntry;
    }

    return null;
  }

  valueChanges() {

    return this.firebaseFcadeService.valueChanges().subscribe(data => {
      console.log(data)
    });;
  }

}