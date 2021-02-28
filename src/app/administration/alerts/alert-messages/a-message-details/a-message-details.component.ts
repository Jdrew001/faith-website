import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertObservablesService } from '../../alert-observables.service';

@Component({
  selector: 'app-a-message-details',
  templateUrl: './a-message-details.component.html',
  styleUrls: ['./a-message-details.component.css']
})
export class AMessageDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') mbdModal: any;
  subscription: Subscription;

  constructor(private alertObserverService: AlertObservablesService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dialogSubscription();
  }

  dialogSubscription() {
    this.subscription = this.alertObserverService.messageDialog$.subscribe(data => {
      console.log('show the dialog');
      this.mbdModal.show();
    });
  }

  onClose(event) {
    this.mbdModal.hide();
  }

}
