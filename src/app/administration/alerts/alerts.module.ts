import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts.component';
import { AlertTabsComponent } from './alert-tabs/alert-tabs.component';
import { AlertService } from './alert.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlertSubscribersComponent } from './alert-subscribers/alert-subscribers.component';
import { AlertGroupsComponent } from './alert-groups/alert-groups.component';
import { AlertMessagesComponent } from './alert-messages/alert-messages.component';
import { AGroupDetailsComponent } from './alert-groups/a-group-details/a-group-details.component';
import { AMessageDetailsComponent } from './alert-messages/a-message-details/a-message-details.component';
import { ASubscribeDetailsComponent } from './alert-subscribers/a-subscribe-details/a-subscribe-details.component';
import { AGroupListComponent } from './alert-groups/a-group-list/a-group-list.component';
import { AlertObservablesService } from './alert-observables.service';
import { AMessageListComponent } from './alert-messages/a-message-list/a-message-list.component';
import { ASubscribeListComponent } from './alert-subscribers/a-subscribe-list/a-subscribe-list.component';

@NgModule({
  declarations: [
    AlertsComponent,
    AlertTabsComponent,
    AlertSubscribersComponent,
    AlertGroupsComponent,
    AlertMessagesComponent,
    AGroupDetailsComponent,
    AMessageDetailsComponent,
    ASubscribeDetailsComponent,
    AGroupListComponent,
    AMessageListComponent,
    ASubscribeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [AlertService, AlertObservablesService],
  exports: [
    AlertsComponent,
    AlertTabsComponent,
    AlertSubscribersComponent,
    AlertGroupsComponent,
    AlertMessagesComponent,
    ASubscribeListComponent
  ]
})
export class AlertsModule { }
