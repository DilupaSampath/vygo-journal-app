import { FIREBASE_COLLECTION } from "../enums/firebase-collection.enum";
import { RequestMethodEnum } from "../enums/request-method.model";
import { AuthDataModel } from "./auth-data.model";
import { QueryObjectModel } from "./query-object.model";

export class ApiRequestDataModel<T>{

    method: RequestMethodEnum;
    private payload: T;
    collection: FIREBASE_COLLECTION;
    private conditions: QueryObjectModel[] = [];

    setPayload<U extends T>(data: U){
        this.payload = data;
    }

    addCondition(data: QueryObjectModel){
        this.conditions.push(data);
    }

    setCondition(data: QueryObjectModel[]){
        this.conditions = data;
    }

    getConditions(){
        return this.conditions;
    }

    getPayload(): T{
        return this.payload;
    }

}