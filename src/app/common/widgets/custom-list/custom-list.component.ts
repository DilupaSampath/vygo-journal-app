import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { GlobalUiEvent } from "../../enums/global-event.enums";
import { GlobalEventHandller } from "../../services/global-event.handller";
@Component({
    selector: 'custom-list',
    templateUrl: './custom-list.component.html',
    styleUrls: ['./custom-list.scss'],
})
  export class CustomListComponent implements OnInit {
    

    constructor(private globalUiEventHandller: GlobalEventHandller, private popoverController: PopoverController){}
    ngOnInit(): void {
  
    }


    diss(){
      this.globalUiEventHandller.triggerUiEvent(true, GlobalUiEvent.POPOVER_CLOSE);
    }


    selectItem(event){
      this.popoverController.dismiss(event);
    }

  }