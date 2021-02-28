import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.retrieveMessages();
    this.retrieveGroups();
    this.retrieveSubscribers();
  }

  retrieveMessages() {
    this.alertService.fetchMessages();
  }

  retrieveGroups() {
    this.alertService.fetchGroups();
  }

  retrieveSubscribers() {
    this.alertService.fetchSubscribers();
  }

}
