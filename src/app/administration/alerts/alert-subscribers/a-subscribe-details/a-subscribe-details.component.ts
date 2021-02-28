import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertObservablesService } from '../../alert-observables.service';

@Component({
  selector: 'app-a-subscribe-details',
  templateUrl: './a-subscribe-details.component.html',
  styleUrls: ['./a-subscribe-details.component.css']
})
export class ASubscribeDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') mdbModal: any;
  subscroption: Subscription;

  constructor(private alertObserverService: AlertObservablesService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dialogSubscription();
  }

  dialogSubscription() {
    this.subscroption = this.alertObserverService.subscriberDialog$.subscribe(data => {
      this.mdbModal.show();
    });
  }

  onClose(event) {
    this.mdbModal.hide();
  }

}
