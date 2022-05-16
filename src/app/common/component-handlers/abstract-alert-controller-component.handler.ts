import { AlertController } from "@ionic/angular";
import { EventEmitter } from "@angular/core";
import { GlobalEventHandller } from "../services/global-event.handller";
import { ControllerActionInputData } from "../enums/controller-action-input-data.enum";

/**
 * Abstract class to generalize the AlertController behavior.
 */
export abstract class AbstractAlertControllerComponentHandler{
    
    constructor(protected alertController: AlertController, protected globalUiEventHandller: GlobalEventHandller){
        this.alertController = alertController;
        this.outputEvent = new EventEmitter<any>()
    }
    
        component: any;
        outputEvent: EventEmitter<any>;
        inputdata: Map<ControllerActionInputData, any>;

        /**
         * can override the dismiss miss behavior to handle complex tasks
         * @param data 
         */
        abstract dismiss(data);

        /**
         * can override the settingAlert to apply customized settings
         * @param ev -- can pass any kind of object to use in child class
         */
        abstract settingAlert(ev: any);
        
    }