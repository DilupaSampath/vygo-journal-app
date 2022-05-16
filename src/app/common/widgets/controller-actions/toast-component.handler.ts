import { ToastController } from "@ionic/angular";
import { AbstractToastComponentHandler } from "../../component-handlers/abstract-toast-component.handler";
import { GlobalEventHandller } from "../../services/global-event.handller";

export class ToastComponentHandler extends AbstractToastComponentHandler{
    constructor(protected toastController: ToastController, protected globalEventHandller : GlobalEventHandller){
        super(toastController, globalEventHandller);
    }
    dismiss() {
        throw new Error("Method not implemented.");
    }
    async settingToast(ev: any) {
        let toast = await this.toastController.create({
            message: ev.message ? ev.message : 'Completed successfully',
            duration: ev.duration ? ev.duration : 3000,
            position: ev.pos ? ev.pos : 'top',
            color: ev.color ? ev.color : ''
          });
          toast.present();
    }

}