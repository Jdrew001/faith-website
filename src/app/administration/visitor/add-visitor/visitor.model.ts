export class VisitorModel {
    visitorId: number;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    taught: string;
    bibleStudy: string;
    address: string;
    state: string;
    zip: string;
    notes: string;
    greeter: string;
    familyMembers: FamilyMembers[] = [];
    methodOfContacts: any[] = [];
    date: string;
}

export class FamilyMembers {
    firstname: string;
    lastname: string;
    age: string;
}

export class MethodOfContacts {
    methodType: string;
}