export interface BasicDetails {
    fullName: string;
    address: string;
    city: string;
    state: string;
}

export interface ContactDetails {
    email: string;
    phone: string;
}

export interface FamilyDetails {
    name: string;
    age: string;
    relationship: string;
}

export interface GreeterDetails {
    greeter: string;
    greeterNotes: string;
}

export interface VisitDetails {
    visit: string;
}

export interface VisitorModel {
    basicDetails: BasicDetails;
    contactDetails: ContactDetails;
    familyDetails: Array<FamilyDetails>;
    greeterDetails: GreeterDetails;
    visitDetails: VisitDetails;
}