import { ModalController } from "@ionic/angular";

import { AbstractModalComponentHandler } from "src/app/common/component-handlers/abstract-modal-component.handler";
import { GlobalUiEvent } from "src/app/common/enums/global-event.enums";
import { ControllerActionInputData } from "src/app/common/enums/controller-action-input-data.enum";
import { GlobalEventHandller } from "src/app/common/services/global-event.handller";

export class PreviewModalHandler extends AbstractModalComponentHandler{
    
    constructor(protected modalController: ModalController, protected globalUiEventHandller: GlobalEventHandller){
        super(modalController, globalUiEventHandller);
        globalUiEventHandller.$globalUiEventHandller.subscribe(data=>{
            if(data && data.event == GlobalUiEvent.MODAL_CLOSE){
                this.dismiss();
            }
        });

    }

    dismiss() {
        this.outputEvent.emit('datasss');
        this.modalController.dismiss();
    }

    
    async presentModal() {

        const modal = await this.modalController.create({
          component: this.component,
          componentProps: this.generateComponentProps() ,
          cssClass: this.inputdata.has(ControllerActionInputData.CSS_CLASS) ? this.inputdata.get(ControllerActionInputData.CSS_CLASS) : '',
        });
        modal.onDidDismiss().then(data => {
          console.log('Modal closed');
          this.dismiss();
          
        });
        return await modal.present();
      }

}