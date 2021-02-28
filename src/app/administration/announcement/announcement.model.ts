import { UploadFile } from 'ng-uikit-pro-standard';

export interface Announcement {
    id: number;
    title: string;
    description: string;
    image: Image;
}

export interface Image {
    alternativeText: string;
    caption: string;
    created_at: string;
    ext: string;
    formats: any
    hash: string;
    height: number;
    id: number;
    mime: string;
    name: string;
    previewUrl: null
    provider: string;
    provider_metadata: null
    size: number
    updated_at: string;
    url: string;
    width: number;
}