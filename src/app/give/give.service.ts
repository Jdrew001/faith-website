import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GiveConstants } from './give.constant';
import { HelperService } from '../core/services/helper.service';
import { LoaderService } from '../core/loader/loader.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../core/services/notification.service';
import { EmailService } from '../core/services/email.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GiveService {

  constructor(
    private httpClient: HttpClient,
    private location: Location,
    private emailService: EmailService,
    private helperService: HelperService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) { }

  // called first
  initiateGivingRequest(formValue, total) {
    const url = this.helperService.getPayPalURL(GiveConstants.PAY_PAL_TOKEN_URL);
    const params = new HttpParams({
      fromObject: {
        grant_type: 'client_credentials'
      }
    });
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(GiveConstants.PAY_INFO.clientId + ':' + GiveConstants.PAY_INFO.secret));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    // Begin request: this call with retrieve a token used for the next two requests
    this.loaderService.toggleLoader(true);
    this.httpClient.post(url, params, {headers}).subscribe(val => {
      this.createOrder(val['access_token'], formValue, total);
    }, err => {
      this.notificationService.displayError('Online giving encounter an error', 'GIVING INCOMPLETE');
      console.log(err);
    });
  }

  // called second
  /**
   * Method calls a service that will create an order and redirect user to pay pal for addtional information
   * @param token used as the Authorization Bearer token
   * @param formValue the body of the request
   * @param total overall total of giving
   */
  private createOrder(token, formValue, total) {
    const url = this.helperService.getPayPalURL(GiveConstants.PAY_PAL_CREATE_ORDER);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    
    // Service call that will create and order and successful response navigates user to paypal
    this.httpClient.post(url, this.generateOrderBody(formValue, total), {headers}).subscribe(item => {
      sessionStorage.clear();
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('captureUrl', item['links'][3]['href']);
      sessionStorage.setItem('tithe', formValue['tithe']);
      sessionStorage.setItem('offerings', JSON.stringify(formValue['offeringArray']));
      sessionStorage.setItem('firstName', formValue['firstName']);
      sessionStorage.setItem('lastName', formValue['lastName']);
      sessionStorage.setItem('email', formValue['email']);
      sessionStorage.setItem('phone', formValue['phone']);
      sessionStorage.setItem('feeCover', formValue['feeCover'])
      this.loaderService.toggleLoader(false);
      console.log('offerings', JSON.stringify(formValue['offeringArray']));
      //this.handleCompletedOrder('COMPLETED'); Testing only
      setTimeout(function(){
        location.href = item['links'][1]['href'];
      },250);
    });
  }

  // called third
  // Method will be called once the user is navigated back from paypal and will let user know if it is successful or not
  captureOrder() {
    let url = sessionStorage.getItem('captureUrl');
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');

    if (url && token) {
      this.loaderService.toggleLoader(true);
      this.httpClient.post(url, {}, {headers}).subscribe(val => {
        this.loaderService.toggleLoader(false);
        this.handleCompletedOrder(val['status']);
      }, err => {
        this.loaderService.toggleLoader(false);
        this.notificationService.displayError('Online giving encounter an error', 'GIVING INCOMPLETE');
      });
    }
  }

  // called in capture order method
  handleCompletedOrder(status) {
    if (status && status === GiveConstants.COMPLETED) {
      const titheAmount = sessionStorage.getItem('tithe');
      const offerings = JSON.parse(sessionStorage.getItem('offerings'));
      const user = sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName');
      const firstName = sessionStorage.getItem('firstName');
      const lastName = sessionStorage.getItem('lastName');
      const email = sessionStorage.getItem('email');
      const phone = sessionStorage.getItem('phone');
      const didCoverFee = sessionStorage.getItem('feeCover');
      this.notificationService.displaySuccess('Online giving successfully completed', 'GIVING COMPLETED');

      this.sendToServer(this.buildObj(firstName, lastName, titheAmount, offerings, email, phone, didCoverFee))
        .subscribe(res => {console.log('COMPLETED', res)});
      sessionStorage.clear();
      this.location.replaceState(this.location.path().split('?')[0], '');
      return;
    }
    this.notificationService.displayError('Online giving encounter an error.', 'GIVING INCOMPLETE');
  }

  private sendToServer(body) {
    let url = this.helperService.getCMSResource('/givings');
    return this.httpClient.post(url, body);
  }

  private buildObj(firstname, lastname, tithe, offerings, email, phone, didCoverFee) {
    console.log('offerings', offerings);
    let obj = {
      'firstName': firstname,
      'lastName': lastname,
      'email': email,
      'phone': phone,
      'tithe': tithe,
      'feeCovered': didCoverFee,
      offerings: offerings
    }
    return obj;
  }

  // utility method handle the first body
  private generateOrderBody(formValue, total) {
    return {
      intent: GiveConstants.INTENT,
      purchase_units: [
        {
          amount: {
            currency_code: GiveConstants.CURRENCY_CODE,
            value: total
          }
        }
      ],
      payer: {
        name: {
          given_name: formValue.firstName,
          surname: formValue.lastName
        },
        email_address: formValue.email,
        phone: {
          phone_type: GiveConstants.PHONE_TYPE,
          phone_number: { national_number: formValue.phone }
        }
      },
      application_context : {
        brand_name : GiveConstants.BRAND_NAME,
        shipping_preference : GiveConstants.SHIPPING_PREFERENCE,
        user_action: GiveConstants.USER_ACTION,
        return_url: environment.REDIRECT_PAGE,
        landing_page: GiveConstants.BILLING
      }
    }
  }
}
