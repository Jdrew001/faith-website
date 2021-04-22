import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutModule } from './about/about.module';
import { BiblestudyModule } from './biblestudy/biblestudy.module';
import { ContactModule } from './contact/contact.module';
import { IamglobalModule } from './iamglobal/iamglobal.module';
import { MinistriesModule } from './ministries/ministries.module';
import { PlanAVisitModule } from './plan-a-visit/plan-a-visit.module';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { AuthModule } from './auth/auth.module';
import { TokenState } from './shared/store/token/token.state';
import { AdministrationModule } from './administration/administration.module';
import { AddVisitorModule } from './administration/visitor/add-visitor/add-visitor.module';
import {ToastModule} from 'primeng/toast';
import { GiveModule } from './give/give.module';
import { ServicesComponent } from './services/services.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { VisitorFormModule } from './administration/visitor/visitor-form/visitor-form.module';
import { WatchComponent } from './watch/watch.component';
import { WatchService } from './watch/watch.service';
import { IconsModule } from 'ng-uikit-pro-standard'
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    PrivacyPolicyComponent,
    WatchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([
      TokenState
    ]),
    IconsModule,
    NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key : 'auth'
    }),
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    SharedModule,
    CoreModule,
    AboutModule,
    BiblestudyModule,
    ContactModule,
    IamglobalModule,
    MinistriesModule,
    PlanAVisitModule,
    AddVisitorModule,
    VisitorFormModule,
    AuthModule,
    AdministrationModule,
    ToastModule,
    GiveModule
  ],
  providers: [
    WatchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
