import { EventEmitter } from "@angular/core";
import { LoadingController, PopoverController } from "@ionic/angular";

import { ControllerActionInputData } from "../enums/controller-action-input-data.enum";
import { GlobalEventHandller } from "../services/global-event.handller";

export abstract class AbstractLoadingComponentHandler{
    
constructor(protected loadingController: LoadingController, protected globalUiEventHandller: GlobalEventHandller){
    this.loadingController = loadingController;
    this.outputEvent = new EventEmitter<any>()
}

    component: any;
    outputEvent: EventEmitter<any>;
    inputdata: Map<ControllerActionInputData, any>;
    abstract dismiss();
    abstract settingLoader(ev: any);
    
}