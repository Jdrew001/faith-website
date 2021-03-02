import { Image } from "../shared/models/CMS_Model";

export class WatchContent {
    image: Image;
    remoteImage: boolean;
    content: string;

    constructor() {
        this.image = this.createImage('images/livestream.jpg');
        this.remoteImage = false;
        this.content = `<h1 class="promo-content">Sunday 10:45 am</h1><h1 class="promo-content">Wednesday 7:30 pm</h1>`;
    }

    private createImage(url) {
        const image = new Image();
        image.url = url;
        return image;
    }
}