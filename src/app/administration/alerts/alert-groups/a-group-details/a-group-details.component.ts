import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../alert.service';
import { AlertObservablesService } from '../../alert-observables.service';

@Component({
  selector: 'app-a-group-details',
  templateUrl: './a-group-details.component.html',
  styleUrls: ['./a-group-details.component.css']
})
export class AGroupDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') mdbModal: any;
  subscription: Subscription;

  constructor(private alertObserverService: AlertObservablesService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.dialogSubscription();
  }

  dialogSubscription() {
    this.subscription = this.alertObserverService.groupDialog$.subscribe(data => {
      if (data) {
        this.mdbModal.show();
      }
    });
  }

  onClose(event) {

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}