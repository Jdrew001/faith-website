import { Component, OnInit, DoCheck, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { GiveConstants } from './give.constant';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { GiveFormValidator } from './utls/GiveValidator';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { GiveService } from './give.service';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from '../shared/scroll.service';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { NotificationService } from '../core/services/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MdbCreditCardDirective } from 'ng-uikit-pro-standard';
import { LoaderService } from '../core/loader/loader.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable/release/utils';

declare var Stripe;

@Component({
  selector: 'app-give',
  templateUrl: './give.component.html',
  styleUrls: ['./give.component.css'],
  animations: [
    trigger('enterTrigger', [
    state('fadeIn', style({
        opacity: '1'
    })),
    transition('void => *', [style({opacity: '0'}), animate('500ms')])
    ])
  ]
})
export class GiveComponent implements OnInit, DoCheck, AfterViewInit {

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.scrollService.menuService$.next(true);
  } 

  @ViewChild(MdbCreditCardDirective) card;
  @ViewChild('numberElement', null) numberElement: ElementRef;
  @ViewChild('expElement', null) expElement: ElementRef;
  @ViewChild('cvvElement', null) cvvElement: ElementRef;

  stripe;
  number;
  exp;
  cvv;
  cardErrors;
  expErrors;
  cvvErrors;

  giveValidator = new GiveFormValidator();
  activeFormIndex = 0;
  offeringCategories = [];
  imageUrl = '';
  formSubmitted = false;
  giveTotal: number = 0;
  zipCode = '';
  cardForm: FormGroup = new FormGroup({
    card: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
    expiration: new FormControl('', [Validators.required])
  })
  giveForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    tithe: new FormControl(0),
    offeringArray: new FormArray([]),
    feeCover: new FormControl(true),
    
  }, [this.giveValidator.oneRequired]);

  elementStyles = {
    base: {
      color: 'black',
      fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
      fontSize: '18px',
      fontSmoothing: 'antialiased',
      borderBottom: '1px solid #DEDEDE',

      '::placeholder': {
        color: '#6C757D',
      },
      ':-webkit-autofill': {
        color: 'black',
      },
    },
    invalid: {
      color: '#E25950',
      '::placeholder': {
        color: 'black',
      },
    },
  };

  elementClasses = {
    focus: 'focused',
    empty: 'empty',
    invalid: 'invalid',
  };

  constructor(
    private helperService: HelperService,
    private giveService: GiveService,
    private activeRoute: ActivatedRoute,
    private scrollService: ScrollService,
    private stripeService: StripeService,
    private notificationService: NotificationService,
    private loaderService: LoaderService) { }

  get giveControls() {
    return {
      email: this.giveForm.get('email'),
      firstName: this.giveForm.get('firstName'),
      lastName: this.giveForm.get('lastName'),
      phone: this.giveForm.get('phone'),
      tithe: this.giveForm.get('tithe'),
      offeringArray: this.giveForm.get('offeringArray'),
      feeCover: this.giveForm.get('feeCover')
    }
  }

  get offeringArray() {
    return this.giveForm.get('offeringArray') as FormArray;
  }

  get lastOfferingControls() {
    return this.offeringArray.controls[this.offeringArray.length - 1];
  }

  get isCreditCardFormValid() {
    return isNullOrUndefined(this.cardErrors) && isNullOrUndefined(this.expErrors) && isNullOrUndefined(this.cvvErrors) && this.zipCode !== '' && this.zipCode.length == 5
  }

  ngOnInit() {
    this.stripe = Stripe(GiveConstants.STRIPE_PK);

    this.imageUrl = this.helperService.getResourceUrl(GiveConstants.GIVE_BG_URL, true);
    this.showOrderResult(this.activeRoute.snapshot.queryParams);
  }

  ngAfterViewInit() {
    this.handleStripeRedirect(this.activeRoute.snapshot.queryParams);
  }

  ngDoCheck() {
    const titheAmount = this.giveControls.tithe;
    if (!titheAmount.value) { titheAmount.setValue(0) }
    this.offeringArray.controls.forEach((val: FormGroup)=> {
      let offering = val.get('offering');
      if (!offering.value) { offering.setValue(0) };
    })
    
    this.giveTotal = this.calculateTotal(titheAmount, this.offeringArray);
  }

  submitWithPaypal() {
    this.formSubmitted = true;
    this.giveForm.updateValueAndValidity({onlySelf:true, emitEvent: false});
    if (this.giveForm.valid) {
      this.formSubmitted = false;
      const formVal = this.giveForm.value;
      formVal.phone = formVal.phone.replace(/\D/g,"");
      this.giveService.initiateGivingRequest(formVal, this.giveTotal.toString());
    }
  }
  
  submitWithStripe() {
    this.formSubmitted = true;
    this.giveForm.updateValueAndValidity({onlySelf:true, emitEvent: false});
    if (this.giveForm.valid) {
      this.formSubmitted = false;
      const formVal = this.giveForm.value;
      formVal.phone = formVal.phone.replace(/\D/g,"");
      this.activeFormIndex = 1;
      setTimeout(() => {
        this.initStripeElements();
        this.initStripeListenters();
      },200)
    }
  }

  async paymentWithStripe() {
    this.formSubmitted = true;
    this.loaderService.toggleLoader(true);
    console.log(this.isCreditCardFormValid);
    this.formSubmitted = false;
    let id = localStorage.getItem('paymentId') as any;
    if (!id) {
      id = await this.createPaymentMethod();
      if (id.error) {
        this.notificationService.displayError('GIVING INCOMPLETE', id['error']['message']);
        this.loaderService.toggleLoader(false);
      } else {
        //localStorage.setItem('paymentId', id['paymentMethod']['id']);
        let data = {
          cardDetails: {
            paymentMethodId: id['paymentMethod']['id']
          },
          giverDetails: this.giveForm.getRawValue()
        }

        let encryptedData = this.giveService.encryptInformation(JSON.stringify(data));
        let body = {
          data: encryptedData
        }

        this.giveService.capturePaymentForStripe(body).subscribe(res => {
          this.loaderService.toggleLoader(false);
          if (res && res['paymentIntent'] && res['paymentIntent']['next_action'] && res['paymentIntent']['next_action']['type'] == 'redirect_to_url') {
            let url = res['paymentIntent']['next_action']['redirect_to_url']['url'];
            console.log('test', url);
            sessionStorage.setItem('PAYMENT_UPDATE', 'pending');
            setTimeout(function(){
              location.href = url;
            },250);
          } else {
            if (res && res['status'] == 501) {
              this.notificationService.displayError('GIVING INCOMPLETE', res['message']);
            } else {
              this.notificationService.displaySuccess('GIVING COMPLETED', 'Online giving successfully completed');
              this.cardForm.reset();
              this.giveForm.reset();
              this.activeFormIndex = 0;
              this.formSubmitted = false;
            }
            
          }
        },err => {
          this.loaderService.toggleLoader(false);
          this.notificationService.displayError('GIVING INCOMPLETE', 'Online giving encounter an error')
        });
      }
    }
  }

  handleStripeRedirect(id) {
    if (id && id['payment_intent']) {
      this.giveService.fetchPaymentIntent(id['payment_intent']).subscribe(res => {
        if (res && res['last_payment_error']) {
          this.notificationService.displayError('GIVING INCOMPLETE', 'Online giving encounter an error')
        } else {
          this.notificationService.displaySuccess('GIVING COMPLETED', 'Online giving successfully completed');
        }
      }, err => {
        this.notificationService.displayError('GIVING INCOMPLETE', 'Online giving encounter an error')
      })
    }
  }

  clearForm() {
    this.formSubmitted = false;
    this.giveForm.reset();
    this.giveControls.tithe.setValue(0);
    while (this.offeringArray.length !== 0) {
      this.offeringArray.removeAt(0);
    }
    this.giveControls.feeCover.setValue(true);
    this.giveForm.updateValueAndValidity({onlySelf:true, emitEvent: false});
  }

  addOffering() {
    const formArr = this.giveControls.offeringArray as FormArray;
    formArr.push(new FormGroup({
      offering: new FormControl(0),
      offeringCategory: new FormControl(null),
      otherOffering: new FormControl(null)
    }, [this.giveValidator.offeringRequired, this.giveValidator.validateOffering, this.giveValidator.validateOfferingOther]));
  }

  popOffering() {
    const formArr = this.giveControls.offeringArray as FormArray;
    formArr.removeAt(formArr.length - 1);
    this.checkFormArrSel(formArr);
  }

  categories(formArr: FormArray) {
    var newItems = GiveConstants.OFFERING_CATEGORIES;
    formArr.controls.forEach((val: FormGroup, i) => {
      let cat = val.controls['offeringCategory'].value;
      newItems.forEach(item => {
        if (cat === item.value) {
          if (cat !== 'Other') {
            item.disabled = true;
          }
        }
      })
    });

    return newItems;
  }

  validateOther(control) {
    let res = false;
    if (control.value && control.value.offeringCategory === 'Other') {
      res = true;
    }

    return res;
  }

  onChange(e) {
    const formArr = this.giveControls.offeringArray as FormArray;
    this.checkFormArrSel(formArr);
  }

  checkFormArrSel(formArr) {
    if (formArr.length === 0) {
      GiveConstants.OFFERING_CATEGORIES.forEach(val => val.disabled = false);
    } else {
      GiveConstants.OFFERING_CATEGORIES.forEach(val => val.disabled = false);
      formArr.value.forEach(element => {
        let item = GiveConstants.OFFERING_CATEGORIES.find(x => x.value === element['offeringCategory']);
        if (item) {
          item.disabled = true;
        }
      });
    }
  }

  private async createPaymentMethod() {
    return await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.number,
      billing_details: {
        email: this.giveControls.email.value,
        name: `${this.giveControls.firstName.value} ${this.giveControls.lastName.value}`,
        phone: this.giveControls.phone.value,
        address: {
          postal_code: this.zipCode
        }
      },
  });
  }

  private showOrderResult(params) {
    if (params && params.token) {
      this.giveService.captureOrder();
    }
  }

  private initStripeElements() {
    const elements = this.stripe.elements();
    this.number = elements.create('cardNumber', {
      style: this.elementStyles,
      classes: this.elementClasses
    });
    this.exp = elements.create('cardExpiry', {
      style: this.elementStyles,
      classes: this.elementClasses
    });
    this.cvv = elements.create('cardCvc', {
      style: this.elementStyles,
      classes: this.elementClasses
    });
    this.number.mount(this.numberElement.nativeElement);
    this.exp.mount(this.expElement.nativeElement);
    this.cvv.mount(this.cvvElement.nativeElement);
  }

  private initStripeListenters() {
    this.number.addEventListener('change', ({ error, empty }) => {
      this.cardErrors = null;
      if (error || empty) {
        this.cardErrors = {
          isEmpty: empty,
          error: error
        }
      }
    });
    this.number.addEventListener('ready', ({ error, empty }) => {
      this.cardErrors = null;
      if (error || empty) {
        this.cardErrors = {
          isEmpty: empty,
          error: error
        }
      }
    });

    this.exp.addEventListener('change', ({ error, empty }) => {
      this.expErrors = null;
      if (error || empty) {
        this.expErrors = {
          isEmpty: empty,
          error: error
        }
      }
    });
    this.exp.addEventListener('ready', ({ error, empty }) => {
      this.expErrors = null;
      if (error || empty) {
        this.expErrors = {
          isEmpty: empty,
          error: error
        }
      }
    });

    this.cvv.addEventListener('change', ({ error, empty }) => {
      this.cvvErrors = null;
      if (error || empty) {
        this.cvvErrors = {
          isEmpty: empty,
          error: error
        }
      }
    });
    this.cvv.addEventListener('ready', ({ error, empty }) => {
      this.cvvErrors = null;
      if (error || empty) {
        this.cvvErrors = {
          isEmpty: empty,
          error: error
        }
      }
    });
  }

  private calculateTotal(tithe, offering: FormArray) : number {
    let offeringTotal = 0;
    offering.controls.forEach(val => {
      offeringTotal += val.get('offering').value;
    });

    if (this.giveControls.feeCover.value && (tithe.value + offeringTotal) !== 0) {
      return +(tithe.value + offeringTotal + (((tithe.value + offeringTotal) * GiveConstants.RATE_FEE.rate) + 0.30)).toFixed(2);
    }

    return tithe.value + offeringTotal;
  }
}
