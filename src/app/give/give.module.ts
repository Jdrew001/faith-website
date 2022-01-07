import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiveComponent } from './give.component';
import { SharedModule } from '../shared/shared.module';
import { GiveService } from './give.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { NgxStripeModule } from 'ngx-stripe';
import { EntryComponent } from './entry/entry.component';
import { GivingInfoComponent } from './giving-info/giving-info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "left",
    allowNegative: false,
    decimal: ".",
    precision: 2,
    prefix: "$ ",
    suffix: "",
    thousands: ","
}

@NgModule({
  declarations: [
    GiveComponent,
    EntryComponent,
    GivingInfoComponent,
    UserInfoComponent,
    PaymentInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    NgxStripeModule.forRoot('pk_test_51IWOf3A0DJoBf0VzbZR7l3xohneGilLnLoYtjesw2BED5SqjGsV8TZa2Xx9d68RCFlmAN87ErPgQhx9UMT1yrC1400omCjotV3')
  ],
  providers: [
    GiveService,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  exports: [
    GiveComponent
  ]
})
export class GiveModule { }
