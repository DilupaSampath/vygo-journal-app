import { PopoverController } from "@ionic/angular";
import { AbstractPopoverComponentHandler } from "src/app/common/component-handlers/abstract-popover-component.handler";
import { GlobalUiEvent } from "src/app/common/enums/global-event.enums";
import { ControllerActionInputData } from "src/app/common/enums/controller-action-input-data.enum";
import { GlobalEventHandller } from "src/app/common/services/global-event.handller";

export class PopoverModalHandler extends AbstractPopoverComponentHandler{
    
    constructor(protected popoverController: PopoverController, protected globalUiEventHandller: GlobalEventHandller){
        super(popoverController, globalUiEventHandller);
        globalUiEventHandller.$globalUiEventHandller.subscribe(data=>{
            if(data && data.event == GlobalUiEvent.POPOVER_CLOSE){
                this.dismiss();
            }
        });
    }

    dismiss() {
        this.outputEvent.emit('datasss popover');
    }

      async settingsPopover(eventData: any) {
        const popover = await this.popoverController.create({
          component: this.component,
          event: eventData,
          cssClass: this.inputdata.has(ControllerActionInputData.CSS_CLASS) ? this.inputdata.get(ControllerActionInputData.CSS_CLASS) : '',
          componentProps: {
           },
          translucent: true
        });
    
        popover.onDidDismiss().then((result) => {
          console.log(result.data);
          this.globalUiEventHandller.triggerUiEvent(result.data, GlobalUiEvent.POPOVER_CLOSE);
        });
    
        return await popover.present();
    
      }

}