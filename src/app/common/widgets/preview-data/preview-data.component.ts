import { Component, Input, OnInit } from "@angular/core";
import { AbstractModalComponentHandler } from "../../component-handlers/abstract-modal-component.handler";
@Component({
    selector: 'preview-data',
    templateUrl: './preview-data.component.html',
    styleUrls: ['./preview-data.scss'],
})
  export class PreviewDataComponent implements OnInit {
    @Input() contentData: any = '';
    @Input() modalHandler: AbstractModalComponentHandler;
  
    constructor(){}
    ngOnInit(): void {
    }

    cancel(){
        if(this.modalHandler){
          this.modalHandler.dismiss();
        }
    }
  }