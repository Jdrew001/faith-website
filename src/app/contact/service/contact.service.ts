import { Injectable } from '@angular/core';
import { ContactModel } from '../contact.model';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/core/services/helper.service';
import { ContactConstant } from '../contact.constant';
import { EmailService } from 'src/app/core/services/email.service';

@Injectable()
export class ContactService {

    constructor(
            private http: HttpClient,
            private helperService: HelperService,
            private emailService: EmailService
        ) { }

    uploadContact(contact: ContactModel)
    {
        console.log(contact);
        let url = this.helperService.getCMSResource(ContactConstant.CONTACT_URL);
        return this.http.post(url, contact);
    }

    //send contact
    sendContact(contactModel: ContactModel) {
        let message = `
            Contact Form Message\n\n
            --------------------\n\n
            First Name: ${contactModel.firstname}\n
            Last Name: ${contactModel.lastname}\n
            E-mail: ${contactModel.email}\n
            Phone: ${contactModel.phone}\n
            Message: ${contactModel.description}
        `;
        return this.emailService.sendEmail(message, `${contactModel.firstname} ${contactModel.lastname}`);
    }

}