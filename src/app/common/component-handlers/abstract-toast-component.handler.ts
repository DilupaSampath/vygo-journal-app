import { EventEmitter } from "@angular/core";
import { ToastController } from "@ionic/angular";

import { ControllerActionInputData } from "../enums/controller-action-input-data.enum";
import { GlobalEventHandller } from "../services/global-event.handller";

export abstract class AbstractToastComponentHandler{
    
constructor(protected toastController: ToastController, protected globalEventHandller : GlobalEventHandller){
    this.toastController = toastController;
    this.outputEvent = new EventEmitter<any>()
}

    component: any;
    outputEvent: EventEmitter<any>;
    inputdata: Map<ControllerActionInputData, any>;
    abstract dismiss();
    abstract settingToast(ev: any);
    
}