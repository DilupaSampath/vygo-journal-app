import { AlertController } from "@ionic/angular";
import { EventEmitter } from "@angular/core";
import { GlobalEventHandller } from "../services/global-event.handller";
import { ControllerActionInputData } from "../enums/controller-action-input-data.enum";

export abstract class AbstractAlertControllerComponentHandler{
    
    constructor(protected alertController: AlertController, protected globalUiEventHandller: GlobalEventHandller){
        this.alertController = alertController;
        this.outputEvent = new EventEmitter<any>()
    }
    
        component: any;
        outputEvent: EventEmitter<any>;
        inputdata: Map<ControllerActionInputData, any>;
        abstract dismiss(data);
        abstract settingAlert(ev: any);
        
    }