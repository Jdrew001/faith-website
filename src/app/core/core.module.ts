import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperService } from './services/helper.service';
import { SubscribeService } from './services/subscribe.service';
import { ToastModule } from 'ng-uikit-pro-standard';
import { NotificationService } from './services/notification.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthorizationService } from './services/authorization.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { SharedModule } from '../shared/shared.module';
import { EmailService } from './services/email.service';
import { GenericResourceService } from './services/generic-resource.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    HelperService,
    SubscribeService,
    NotificationService,
    AuthenticationService,
    AuthorizationService,
    LoaderService,
    EmailService
  ],
  exports: [
    LoaderComponent
  ]
})
export class CoreModule { }
