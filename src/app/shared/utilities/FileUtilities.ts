import { Injectable } from '@angular/core';
import { UploadFile } from 'ng-uikit-pro-standard';

@Injectable()
export class FileUtilityService {

    convertByteTo64(bytes): string {
        let uints = new Uint8Array(bytes);
        const stringChar = uints.reduce((data, byte)=> {
            return data + String.fromCharCode(byte);
        }, '');
        return btoa(stringChar);
    }

    convertBase64ToImagefile(base64: string): UploadFile {
        const date = new Date().valueOf();
        let text = '';
        const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
        }
        // Replace extension according to your media type
        const imageName = date + '.' + text + '.jpg';
        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(base64);
        let file = new File([imageBlob], imageName, { type: 'image/jpg' });
        let uploadFile: UploadFile = { id: imageName, fileIndex: 0, lastModifiedDate: null, nativeFile: file,
            name: imageName, size: file.size, type: file.type, form: null, progress: null }
        return uploadFile;
    }

    private dataURItoBlob(dataURI) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/jpg' });    
        return blob;
     }
}