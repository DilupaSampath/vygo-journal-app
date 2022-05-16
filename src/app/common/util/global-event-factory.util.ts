import { GlobalUiEvent } from "../enums/global-event.enums";
import { GlobalEventModel } from "../models/global-event.model";

export class GlobalEventFactoryUtil{
    

    public static createEventDataObject(data, eventType: GlobalUiEvent){
        let globalEventModel = null;
        switch (eventType) {
            case GlobalUiEvent.MAIN_MENUE_VISIBILITY:
                globalEventModel =  new GlobalEventModel<GlobalUiEvent,any>();
                globalEventModel.event = GlobalUiEvent.MAIN_MENUE_VISIBILITY;
                globalEventModel.data = data;
                break;
            case GlobalUiEvent.MODAL_CLOSE:
                globalEventModel =  new GlobalEventModel<GlobalUiEvent,any>();
                globalEventModel.event = GlobalUiEvent.MODAL_CLOSE;
                globalEventModel.data = data;
                break;
            case GlobalUiEvent.POPOVER_CLOSE:
                globalEventModel =  new GlobalEventModel<GlobalUiEvent,any>();
                globalEventModel.event = GlobalUiEvent.POPOVER_CLOSE;
                globalEventModel.data = data;
                break;
            case GlobalUiEvent.FILE_UPLOAD:
                globalEventModel =  new GlobalEventModel<GlobalUiEvent,any>();
                globalEventModel.event = GlobalUiEvent.FILE_UPLOAD;
                globalEventModel.data = data;
                break;
            case GlobalUiEvent.LOADER_CLOSE:
                globalEventModel =  new GlobalEventModel<GlobalUiEvent,any>();
                globalEventModel.event = GlobalUiEvent.LOADER_CLOSE;
                globalEventModel.data = data;
                break;

            case GlobalUiEvent.LOADER_OPEN:
                globalEventModel =  new GlobalEventModel<GlobalUiEvent,any>();
                globalEventModel.event = GlobalUiEvent.LOADER_OPEN;
                globalEventModel.data = data;
                break;
            case (GlobalUiEvent.CONFRIM_DIALOG):
                globalEventModel =  new GlobalEventModel<GlobalUiEvent,any>();
                globalEventModel.event = GlobalUiEvent.CONFRIM_DIALOG;
                globalEventModel.data = data;
                break;
            case (GlobalUiEvent.CONFRIM_DIALOG_CLOSE):
                globalEventModel =  new GlobalEventModel<GlobalUiEvent,any>();
                globalEventModel.event = GlobalUiEvent.CONFRIM_DIALOG_CLOSE;
                globalEventModel.data = data;
                break;
        
            default:
                break;
        }
        return globalEventModel;
    }


}