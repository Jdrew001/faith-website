import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ConfirmService } from './confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @ViewChild('confirm') confirmDeleteModal: any;
  @Output() confirmed = new EventEmitter<boolean>();

  constructor(private confirmService: ConfirmService) { }

  ngOnInit() {
    this.confirmService.confirm$.subscribe(data => {
      if (data) {
        this.confirmDeleteModal.show();
      }
    });
  }

  confirmDelete() {
    this.confirmed.emit(true);
    this.confirmDeleteModal.hide();
  }
}
