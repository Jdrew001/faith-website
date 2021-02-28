import { Component, OnInit } from '@angular/core';
import { ListView } from '../list-view';
import { PagingService } from 'src/app/core/services/paging.service';
import { AlertService } from '../alert.service';
import { AlertObservablesService } from '../alert-observables.service';

@Component({
  selector: 'app-alert-groups',
  templateUrl: './alert-groups.component.html',
  styleUrls: ['./alert-groups.component.css']
})
export class AlertGroupsComponent  implements OnInit {

  groups = [];

  constructor(private alertObserverService: AlertObservablesService) {}

  ngOnInit() {
    this.initialGroups();
  }

  // retrieve the groups 
  initialGroups() {
    this.alertObserverService.groups$.subscribe(val => this.groups = val);
  }

  detailsEvent() {
    this.alertObserverService.notifyGroupDialogSubs({});
  }

  filterListView(event) {
    
  }

}
