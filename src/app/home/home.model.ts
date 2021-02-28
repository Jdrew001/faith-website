import { Image } from '../shared/models/CMS_Model';

export interface Overlay {
    id: number;
    title: string;
    description: string;
    button_url: string;
    show_button: boolean;
    background: Image;
    remoteImage: boolean;
}

export interface Card {
    id: number;
    title: string;
    description: string;
    sub_title: string;
    image: Image;
    remoteImage: boolean;
}



export class HomeContent {
    planVisit: Overlay;
    missions: Card;
    bibleStudy: Overlay;
    about: Card;
    service_times: string;
    address: string;

    constructor() {
        this.initPlanVisit();
        this.initMissions();
        this.initBibleStudy();
        this.initAbout();
        this.initAddressTimes();
    }

    private initAddressTimes() {
        this.service_times = `<h2>Service Times</h2><p>Sundays: 10:00 am</p><p>Wednesdays: 7:30 pm</p>`;
        this.address = `<h2 style="margin-bottom: 10px;">507 E Randol Mill Rd</h2><h2>Arlington, TX 76011</h2>`;
    }

    private initPlanVisit() {
        this.planVisit = {
            id: 1,
            title: 'PLAN A VISIT',
            description: `<p>The service will typically be about 90 minutes in length including sunday school and worship. <br><br>Feel free to come a few minutes early to join us in prayer. 
            You can expect exciting live worship music, relevant teaching from the Bible, and a time of prayer. 
            <br><br>We want your experience at Faith Tabernacle to be a great one.</p>`,
            button_url: '/planavisit',
            show_button: true,
            background: this.createImage('images/worship.jpg'),
            remoteImage: false
        }
    }

    private initMissions() {
        this.missions = {
            id: 1,
            title: 'About Foreign Missions',
            description: `<p class="black-font">In Mark 16:15, Jesus says to “Go ye into all the world, and preach the gospel to every creature.” Our mission field is both Arlington and the world. 
            We believe that as a congregation we need to support our brothers and sisters across the globe.</p>`,
            sub_title: '',
            image: this.createImage('images/global.jpg'),
            remoteImage: false
        }
    }

    private initBibleStudy() {
        this.bibleStudy = {
            id: 1,
            title: 'BIBLE STUDY',
            description: `<p>A Bible study is an opportunity for you and another person from our ministry team to discuss relevant topics in our lives in relation to the living word of God. 
                If are interested in a bible study with a member of our staff, send us a message. </p>`,
            button_url: '/contact',
            show_button: true,
            background: this.createImage('images/bible.jpg'),
            remoteImage: false
        }
    }

    private initAbout () {
        this.about = {
            id: 1,
            title: 'About the Pastor',
            description: `<p class="black-font">Jonathan and Melissa Harris have been married for 26 years and, together, have four daughters. 
            Jonathan is a graduate of Texas Bible College with a diploma in Christian Ministry with a focus in Theology.</p>
                <p class="font-weight-normal black-font">Jonathan and Melissa have been active pastors at Faith Tabernacle for 14 years. 
            Prior to pastoring, Jonathan and Melissa were missionaries in Nairobi, Kenya, where they directed a bible school and founded churches in the local community.</p>`,
            sub_title: 'Jonathan and Melissa Harris',
            image: this.createImage('images/momanddad.jpg'),
            remoteImage: false
        }
    }

    private createImage(url) {
        const image = new Image();
        image.url = url;
        return image;
    }
}