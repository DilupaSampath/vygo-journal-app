import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';

import { CustomDatePipe } from '../../pipes/custom-date.pipe';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.page.html',
  styleUrls: ['./chip-list.page.scss'],
})
export class ChipListPage implements OnInit {

  @Input() chipListSet: Set<string> = new Set();
  @Output() selectedTags: EventEmitter<any> = new EventEmitter();

  customDatePipe: CustomDatePipe = null;
  tag: string = '';

  constructor( @Inject(LOCALE_ID) public locale: string) {
    this.customDatePipe = new CustomDatePipe(locale);
    const date = this.customDatePipe.transform(new Date(), 'EEEE');
    // this.chipListSet.add(date);
   }

  ngOnInit() {
    this.selectedTags.emit(Array.from(this.chipListSet));
  }


  addItem(name){
    this.chipListSet.add(name);
    this.tag = '';
    this.selectedTags.emit(Array.from(this.chipListSet));
  }

  removeItem(item){
    this.chipListSet.delete(item);
    this.selectedTags.emit(Array.from(this.chipListSet));
  }

}
