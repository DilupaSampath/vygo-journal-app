import { Injectable, Injector } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from "@angular/fire/firestore";
import firebase from "firebase";
import { ApiRequestDataModel } from "../models/api-request-data.model";
import { QueryObjectModel } from "../models/query-object.model";
import { FirebaseAuthService } from "./firebase-auth.service";
import { FirebaseCrudUtil } from "../util/firebase-crud.util";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JournalEntry } from "../models/journal-entry.model";

// this is to mannage multiple service through one reference, That will be easier to acces from anyware.
@Injectable({
  providedIn: 'root'
})
export class FirebaseFcadeService {
  private _databaseReference: AngularFirestore;
  private _firebaseAuthService: FirebaseAuthService;
  private _firestoreReference: firebase.storage.Storage;

  constructor(private injector: Injector) {
  }

  get getDatabaseReference(): AngularFirestore {
    if (!this._databaseReference) {
      this._databaseReference = this.injector.get(AngularFirestore);
    }
    return this._databaseReference;
  }

  get getFirebaseAuthService(): FirebaseAuthService {
    if (!this._firebaseAuthService) {
      this._firebaseAuthService = this.injector.get(FirebaseAuthService);
    }
    return this._firebaseAuthService;
  }

  get getFirestoreReference(): firebase.storage.Storage {
    if (!this._firestoreReference) {
      this._firestoreReference = firebase.storage();
    }
    return this._firestoreReference;
  }

  async saveItem<T>(requestData: ApiRequestDataModel<T>): Promise<firebase.firestore.QuerySnapshot> {
    return FirebaseCrudUtil.send<T>(requestData, this.getDatabaseReference);
  }

  getById(apiRequestDataModel: ApiRequestDataModel<QueryObjectModel[]>): Promise<firebase.firestore.QuerySnapshot> {
    return FirebaseCrudUtil.send<QueryObjectModel[]>(apiRequestDataModel, this.getDatabaseReference)
  }

  delete(apiRequestDataModel: ApiRequestDataModel<JournalEntry>): Promise<firebase.firestore.QuerySnapshot> {
    return FirebaseCrudUtil.send<JournalEntry>(apiRequestDataModel, this.getDatabaseReference)
  }

  async get(apiRequestDataModel: ApiRequestDataModel<QueryObjectModel[]>): Promise<firebase.firestore.QuerySnapshot> {
    apiRequestDataModel.addCondition(this.setAuthDataQueryArray());
    apiRequestDataModel.setPayload(null);
    return FirebaseCrudUtil.send<QueryObjectModel[]>(apiRequestDataModel, this.getDatabaseReference);
  }


  async updateItem<T>(apiRequestDataModel: ApiRequestDataModel<T>): Promise<firebase.firestore.QuerySnapshot> {
    return FirebaseCrudUtil.send<T>(apiRequestDataModel, this.getDatabaseReference);
  }

  setAuthData(requestData: any) {
    if (requestData && requestData.payload) {
      requestData.payload.author = this.getFirebaseAuthService.getAuthata();
    }
  }

  setAuthDataQueryArray(): QueryObjectModel {
    const queryObjectModel = new QueryObjectModel();
    const authData = this.getFirebaseAuthService.getAuthata();
    queryObjectModel.leftItem = 'author.id';
    queryObjectModel.rightItem = authData.id;
    queryObjectModel.opperator = '==';
    return queryObjectModel;
  }

  valueChanges(): Observable<any> {
    return this.getDatabaseReference.collection('JOURNAL_ENTRY')
      .stateChanges(['added', 'removed', 'modified'])
      .pipe(map(item => {
        return null;
      }));
  }



}