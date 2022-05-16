import { LoadingController } from "@ionic/angular";
import { AbstractLoadingComponentHandler } from "../../component-handlers/abstract-loading-component.handler";
import { GlobalUiEvent } from "../../enums/global-event.enums";
import { GlobalEventHandller } from "../../services/global-event.handller";

export class LoaderComponentHandeler extends AbstractLoadingComponentHandler{

    constructor(protected loadingController: LoadingController, protected globalUiEventHandller: GlobalEventHandller){
        super(loadingController, globalUiEventHandller);
        globalUiEventHandller.$globalUiEventHandller.subscribe(data=>{
            if(data && data.event == GlobalUiEvent.LOADER_CLOSE){
                this.dismiss();
            }
        });
    }
    dismiss() {
        this.outputEvent.emit('datasss loader');
    }
   async settingLoader(ev: any) {
        const loading = await this.loadingController.create({
            cssClass: ev.css ? ev.css : '',
            message: ev.message
          });

          loading.onDidDismiss().then((result) => {
            console.log(result.data);
            this.globalUiEventHandller.triggerUiEvent(result.data, GlobalUiEvent.LOADER_CLOSE);
          });
          this.globalUiEventHandller.triggerUiEvent(loading, GlobalUiEvent.LOADER_OPEN);
          return await loading.present();
    }
    
}