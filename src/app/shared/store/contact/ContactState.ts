import { State, Action, StateContext } from '@ngxs/store';
import { ContactModel } from 'src/app/contact/contact.model';
import { SubmitContact } from '../../actions/contact/SubmitContact';

export interface ContactStateModel {
    model: ContactModel
}

@State<ContactStateModel>({
    name: 'contact',
    defaults: {
        model: null
    }  
})
export class ContactState {

    @Action(SubmitContact)
    submitContact(ctx: StateContext<ContactStateModel>) {
        const state = ctx.getState();
        //build the service
    }

}