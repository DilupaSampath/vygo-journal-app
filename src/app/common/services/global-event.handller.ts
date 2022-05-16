import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { GlobalUiEvent } from "../enums/global-event.enums";
import { GlobalEventModel } from "../models/global-event.model";
import { GlobalEventFactoryUtil } from "../util/global-event-factory.util";

@Injectable({
    providedIn: 'root'
})
export class GlobalEventHandller {
    private _globalUiEventHandller: Subject<GlobalEventModel<GlobalUiEvent, any>> = new Subject();
    public $globalUiEventHandller: Observable<GlobalEventModel<GlobalUiEvent, any>> = this._globalUiEventHandller.asObservable();

    triggerUiEvent(data, type: GlobalUiEvent){
        const eventData = GlobalEventFactoryUtil.createEventDataObject(data, type);
        this._globalUiEventHandller.next(eventData);
    }

}