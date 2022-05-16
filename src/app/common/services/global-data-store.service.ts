import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class GlobalDataStoreService {
    private _cacheDataMap: Map<string, any> = new Map();


    addItem(key: string, value: any) {
        this._cacheDataMap.set(key, value);
    }

    getItem(key: string) {
        return this._cacheDataMap.has(key) ? this._cacheDataMap.get(key) : null;
    }

    removeItem(key: string){
        this._cacheDataMap.delete(key);
    }
}