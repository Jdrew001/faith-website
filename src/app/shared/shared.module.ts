import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { LazyloaderDirective } from './directives/lazyloader.directive';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ConfirmService } from './components/confirm/confirm.service';
import { UnderContructionComponent } from './components/under-contruction/under-contruction.component';
import { MessageService } from 'primeng/api';
import { FileUtilityService } from './utilities/FileUtilities';
import { SpecialAlertComponent } from './components/special-alert/special-alert.component';
import { SpecialAlertService } from './components/special-alert/special-alert.service';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { ScrollService } from './scroll.service';


@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent,
    LazyloaderDirective,
    PhoneMaskDirective,
    ConfirmComponent,
    UnderContructionComponent,
    SpecialAlertComponent,
    SanitizePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  providers: [
    ConfirmService,
    MessageService,
    FileUtilityService,
    SpecialAlertService,
    ScrollService
  ],
  exports: [
    FooterComponent,
    NavigationComponent,
    MDBBootstrapModulesPro,
    LazyloaderDirective,
    PhoneMaskDirective,
    ConfirmComponent,
    UnderContructionComponent,
    SpecialAlertComponent,
    SanitizePipe
  ]
})
export class SharedModule { }
