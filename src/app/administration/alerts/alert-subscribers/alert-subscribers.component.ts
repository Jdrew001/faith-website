import { Component, OnInit } from '@angular/core';
import { AlertObservablesService } from '../alert-observables.service';

@Component({
  selector: 'app-alert-subscribers',
  templateUrl: './alert-subscribers.component.html',
  styleUrls: ['./alert-subscribers.component.css']
})
export class AlertSubscribersComponent implements OnInit {

  subscribers = [];

  constructor(private alertObserverService: AlertObservablesService) { }

  ngOnInit() {
    this.initialSubscribers();
  }

  initialSubscribers() {
    this.alertObserverService.subscribers$.subscribe(data => {
      this.subscribers = data;
    });
  }

  dialogOpen() {
    this.alertObserverService.notifySubscriberDialogSubs({});
  }

  filterListView(event) {
    
  }

}
