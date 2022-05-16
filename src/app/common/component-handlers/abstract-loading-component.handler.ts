import { EventEmitter } from "@angular/core";
import { LoadingController, PopoverController } from "@ionic/angular";

import { ControllerActionInputData } from "../enums/controller-action-input-data.enum";
import { GlobalEventHandller } from "../services/global-event.handller";

/**
 * Abstract class to generalize the LoadingController behavior.
 */
export abstract class AbstractLoadingComponentHandler {

    constructor(protected loadingController: LoadingController, protected globalUiEventHandller: GlobalEventHandller) {
        this.loadingController = loadingController;
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
    * can override the settingAlert to apply customized settings
    * @param ev -- can pass any kind of object to use in child class 
    */
    abstract settingLoader(ev: any);

}