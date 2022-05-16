import { EventEmitter } from "@angular/core";
import { ToastController } from "@ionic/angular";

import { ControllerActionInputData } from "../enums/controller-action-input-data.enum";
import { GlobalEventHandller } from "../services/global-event.handller";

/**
 * Abstract class to generalize the ToastController behavior.
 */
export abstract class AbstractToastComponentHandler{
    
constructor(protected toastController: ToastController, protected globalEventHandller : GlobalEventHandller){
    this.toastController = toastController;
    this.outputEvent = new EventEmitter<any>()
}

    component: any;
    outputEvent: EventEmitter<any>;
    inputdata: Map<ControllerActionInputData, any>;

    /**
      * can override the dismiss miss behavior to handle complex tasks
      * @param data 
      */
    abstract dismiss();

    /**
    * can override the settingToast to apply customized settings
    * @param ev -- can pass any kind of object to use in child class
    */
    abstract settingToast(ev: any);
    
}