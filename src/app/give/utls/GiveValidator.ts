import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export class GiveFormValidator {
    validateOffering(giveForm: AbstractControl) : {[key: string]: boolean} {
        const offeringControl = giveForm.get('offering');
        const offeringCat = giveForm.get('offeringCategory');
        
        if (offeringControl && offeringControl.value !== 0) {
            if (offeringCat && (offeringCat.value === null || offeringCat.value === '')) {
                return { 'categoryRequired': true };
            }
 

        }

        return null;
    }

    validateOfferingOther(giveForm: AbstractControl) {
        const offeringControl = giveForm.get('offering');
        const offeringCat = giveForm.get('offeringCategory');
        const offeringOther = giveForm.get('otherType');
        
        if (offeringControl && offeringControl.value !== 0) {
            console.log('Offering Other', offeringOther.value);
            console.log('Offering Category', offeringCat.value);
            if (offeringCat && offeringCat.value === 'Other' && offeringOther && (offeringOther.value === '' || !offeringOther.value)) {
                return { 'otherRequired': true };
            }
        }

        return null;
    }

    offeringRequired(giveForm: AbstractControl) : {[key: string]: boolean} {
        const offeringControl = giveForm.get('offering');
        if (offeringControl && (offeringControl.value === 0) || !offeringControl.value) {
            return { 'offeringRequired': true };
        }
        return null;
    }

    oneRequired(giveForm: AbstractControl) : {[key: string]: boolean} {
        const offeringArray = giveForm.get('offeringArray') as FormArray;
        const titheControl = giveForm.get('tithe');

        let offeringValid = false;
        offeringArray.controls.forEach((control: FormGroup) => {
            if (control.controls['offering'].value !== 0) {
                offeringValid = true;
            }
        });

        if (!titheControl.value || titheControl.value === 0) { // tithe is empty
            if (!offeringValid) {
                return { 'oneRequired':  true };
            }
        }
        return null;
    }
}