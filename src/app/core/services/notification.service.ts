import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable()
export class NotificationService {

  options = { opacity: 1.0, positionClass: 'md-toast-top-center', timeOut: 2000 };

  constructor(private messageService: MessageService) { }

  displaySuccess(message, title) {
    this.messageService.add({severity:'success', summary: message, detail: title, life: 2000});
  }

  displayError(message, title) {
    this.messageService.add({severity:'error', summary: message, detail: title, life: 2000});
  }

  displayInfo(message, title) {
    this.messageService.add({severity:'info', summary: message, detail: title});
  }

  displayWarning(message, title) {
    this.messageService.add({severity:'warning', summary: message, detail: title});
  }
}
