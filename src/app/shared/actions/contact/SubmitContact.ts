import { ContactModel } from 'src/app/contact/contact.model';

export class SubmitContact {
    static readonly type = '[Contact] SubmitContact';

    constructor(public contactModel: ContactModel) { }
}