import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userId = null;
  modal: HTMLElement;
  todoList = [
    {
      itemPriority: 'high',
      itemDueDate: new Date(),
      itemCategory: 'Fun day'
    },
    {
      itemPriority: 'low',
      itemDueDate: new Date(),
      itemCategory: 'Sport week'
    },
    {
      itemPriority: 'meddle',
      itemDueDate: new Date(),
      itemCategory: 'Dinner out'
    },
    {
      itemPriority: 'meddle',
      itemDueDate: new Date(),
      itemCategory: 'Take to the peace'
    },
    {
      itemPriority: 'high',
      itemDueDate: new Date(),
      itemCategory: 'Go with light'
    }
  ]
  constructor(
    private data: DataService,
    private route: ActivatedRoute) {}

  ngOnInit() {

  }



}
