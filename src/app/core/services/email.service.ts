import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendEmail(message?, user?) {
    var template_params = {
      "reply_to": "DO NOT REPLY",
      "from_name": user,
      "to_name": "Faith Tabernacle Admin",
      "message_html": message
   }
   
   var service_id = "gmail";
   var template_id = "template_POdVKQKk";
   var user_id  = 'user_XLJpTuSLCweyHSrHXUynH'
    return emailjs.send(service_id, template_id, template_params, user_id)
  }

  sendUserConfirmationEmail(message?, user?) {
    var template_params = {
      "reply_to": "DO NOT REPLY",
      "from_name": 'Faith Tabernacle Arlington',
      "to_name": user,
      "message_html": message
    };

    var service_id = "gmail";
    var template_id = "template_POdVKQKk";
    var user_id  = 'user_XLJpTuSLCweyHSrHXUynH'
     emailjs.send(service_id, template_id, template_params, user_id).then(val => {
       console.log(val);
     }, err => {
       console.log(err);
     });
  }
}
