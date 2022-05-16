import { AngularFirestore, AngularFirestoreCollection, DocumentData } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { FIREBASE_COLLECTION } from "../enums/firebase-collection.enum";
import { RequestMethodEnum } from "../enums/request-method.model";
import { ApiRequestDataModel } from "../models/api-request-data.model";
import { APIResponseWrapper } from "../models/api-response.wrapper";
import { AuthDataModel } from "../models/auth-data.model";
import { QueryObjectModel } from "../models/query-object.model";

export class FirebaseCrudUtil{

    public static send<T>(requestData: ApiRequestDataModel<T>, connection:AngularFirestore): Promise<firebase.firestore.QuerySnapshot>{
        let firestoreConnection: Promise<any> = null;
        let docId = null;
        let payload = null;
        if(requestData && requestData.getPayload()){
            delete requestData.getPayload()['firebaseAuthService'];
            docId = requestData.getPayload()['_id'];
            delete requestData.getPayload()['_id'];
            payload = JSON.parse(JSON.stringify(requestData.getPayload()));
        }

        try {
            
            
            switch (requestData.method) {
                case RequestMethodEnum.GET:
                    const collectionWithoutQuery = connection.collection(requestData.collection).ref;
                    const collectionWithQuery = this.generateQueries(requestData.getConditions(), collectionWithoutQuery);
                    firestoreConnection = collectionWithQuery.get();
                    return firestoreConnection;
                case RequestMethodEnum.POST:
                    firestoreConnection = connection.collection(requestData.collection).add(payload);
                    return firestoreConnection;
                case RequestMethodEnum.DELETE:
                   firestoreConnection = connection.doc(FIREBASE_COLLECTION.JOURNAL_ENTRY + `/${docId}`).delete();
                    return firestoreConnection;
                case RequestMethodEnum.PUT:
                    firestoreConnection = connection.collection(requestData.collection).doc(docId).update(payload);
                    return firestoreConnection;
                default:
                    break;
            }
        } catch (error) {
            firestoreConnection = null;
        }

    }


    public static generateQueries(queryObjectArray: QueryObjectModel[], collection:any){
        let query = collection;
        queryObjectArray.forEach(element=>{
            query = query.where(element.leftItem, element.opperator, element.rightItem);
        });
        return query;
    }

    public static generateQueryObjectModel(left:any, right: string, condition: string){
        const queryObjectModel = new QueryObjectModel();
      queryObjectModel.leftItem = left;
      queryObjectModel.rightItem =right;
      queryObjectModel.opperator = condition;
      return queryObjectModel;
    }
}