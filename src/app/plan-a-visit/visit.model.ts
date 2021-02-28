import { Image } from "../shared/models/CMS_Model";
export class Heading {
    id: number;
    title: string;
    subTitle: string;
    background: Image;
    remoteImage: boolean;
}

export class VisitDetails {
    id: number;
    title: string;
    description: string;
}

export class ServiceTimes {
    id: number;
    title: string;
    times: string;
}

export class VisitContent {
    id: number;
    pageTitle: string;
    heading: Heading;
    serviceTimes: ServiceTimes;
    visitDetails: Array<VisitDetails>;

    constructor() {
        this.initHeading();
        this.initServiceTimes();
        this.initVisitDetails();
    }

    private initHeading() {
        this.heading = {
            id: 1,
            title: 'PLAN A VISIT',
            subTitle: `<p class="text-center">As disciples, we believe that there is significance in both preaching and teaching.
            <br>At 10:00 we start worship service followed by preaching including the entire congregation.</p>`,
            background: this.createImage('images/worship.jpg'),
            remoteImage: false
        }
    }

    private initServiceTimes() {
        this.serviceTimes = {
            id: 1,
            title: 'SERVICE TIMES',
            times: `<p class="black-font"><em>Sundays</em><br><em>10:00 AM Service</em></p><p class="black-font"><em>Wednesdays</em><br><em>7:30 PM Service</em></p>`
        }
    }

    private initVisitDetails() {
        this.visitDetails = [
            {
                id: 1,
                title: 'What will happen when I visit?',
                description: `<p class="black-font">Expect to receive a warm welcome and lots of smiles. 
                If this is your first time to visit, our greeting team will make sure you are welcomed and will ask if you would fill out a visitor log online. 
                Our team will want to meet with you after service to give you a small gift.</p>`
            },
            {
                id: 1,
                title: 'What do I wear?',
                description: `<p class="black-font">We have a “come as you are” policy. Some people wear jeans and a t-shirt while some like to dress in business wear. Wear what is comfortable to you.</p>`
            },
            {
                id: 1,
                title: 'WHAT ABOUT MY KIDS?',
                description: `<p class="black-font">Kids classes are temporily postponed due to covid. This is a fun and interactive way for them to learn about Jesus in their own space. </p>`
            }
        ]
    }

    private createImage(url) {
        const image = new Image();
        image.url = url;
        return image;
    }
}