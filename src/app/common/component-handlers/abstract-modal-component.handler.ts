import { EventEmitter } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { ControllerActionInputData } from "../enums/controller-action-input-data.enum";
import { GlobalEventHandller } from "../services/global-event.handller";

/**
 * Abstract class to generalize the ModalController behavior.
 */
export abstract class AbstractModalComponentHandler {

    constructor(protected modalController: ModalController, protected globalUiEventHandller: GlobalEventHandller) {
        this.modalController = modalController;
        this.outputEvent = new EventEmitter<any>()
    }

    component: any;
    outputEvent: EventEmitter<any>;
    inputdata: Map<ControllerActionInputData | any, any>;

    /**
      * can override the dismiss miss behavior to handle complex tasks
      * @param data 
      */
    abstract dismiss();
    
    /**
     * can override the settingAlert to apply customized settings
     * 
     */
    abstract presentModal();

    protected generateComponentProps() {
        let obj = {};
        this.inputdata.forEach((val, key) => {
            obj[key] = val;
        });
        return obj;
    }

}