import { AlertController, LoadingController } from "@ionic/angular";
import { AbstractAlertControllerComponentHandler } from "../../component-handlers/abstract-alert-controller-component.handler";
import { GlobalUiEvent } from "../../enums/global-event.enums";
import { GlobalEventHandller } from "../../services/global-event.handller";

export class AlertControllerComponentHandeler extends AbstractAlertControllerComponentHandler{

    constructor(protected alertController: AlertController, protected globalUiEventHandller: GlobalEventHandller){
        super(alertController, globalUiEventHandller);
        globalUiEventHandller.$globalUiEventHandller.subscribe(data=>{
            if(data && data.event == GlobalUiEvent.CONFRIM_DIALOG_CLOSE){
                this.dismiss('CANCEL');
            }
        });
    }

    dismiss(data) {
        this.outputEvent.emit(data);
    }

    confirm(data){
        this.outputEvent.emit('CONFIRM');
    }

    async settingAlert(ev: any) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: ev.subtitle,
            subHeader: ev.subtitle,
            message: ev.message ? ev.message : '',
            buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    this.dismiss('CANCEL');
                    console.log('Confirm Cancel: blah');
                  }
                }, {
                  text: 'Okay',
                  handler: () => {
                    console.log('Confirm Okay');
                    ev.callback();
                  }
                }
              ]
          });

          alert.onDidDismiss().then((result) => {
            console.log(result.data);
          });
          this.globalUiEventHandller.triggerUiEvent(this, GlobalUiEvent.CONFRIM_DIALOG);
          return await alert.present();
    }
}