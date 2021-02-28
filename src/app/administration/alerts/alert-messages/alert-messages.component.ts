import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { PagingService } from 'src/app/core/services/paging.service';
import { ListView } from '../list-view';
import { AlertObservablesService } from '../alert-observables.service';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.css']
})
export class AlertMessagesComponent implements OnInit {

  messages = [];

  constructor(private alertObserverService: AlertObservablesService) {
  }

  ngOnInit() {
    this.initialMessages();
  }

  initialMessages() {
    this.alertObserverService.messages$.subscribe(val => this.messages = val);
  }

  dialogOpen() {
    this.alertObserverService.notifyMessageDialogSubs({});
  }

  filterListView(val) {
    console.log(val);
  }
}
