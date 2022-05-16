import { EventEmitter } from "@angular/core";
import { PopoverController } from "@ionic/angular";

import { ControllerActionInputData } from "../enums/controller-action-input-data.enum";
import { GlobalEventHandller } from "../services/global-event.handller";

/**
 * Abstract class to generalize the PopoverController behavior.
 */
export abstract class AbstractPopoverComponentHandler{
    
constructor(protected popoverController: PopoverController, protected globalUiEventHandller: GlobalEventHandller){
    this.popoverController = popoverController;
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
    * can override the settingsPopover to apply customized settings
    * @param ev -- can pass any kind of object to use in child class
    */
    abstract settingsPopover(ev: any);
    
}