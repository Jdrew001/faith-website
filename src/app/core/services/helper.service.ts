import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public getResourceUrl(resourceUrl: string, isAsset = false): string {
    return (isAsset ? environment.ASSET_URL : environment.BASE_URL) + resourceUrl;
  }

  public getCMSResource(resourceUrl: string): string {
    return environment.CMS_URL + resourceUrl;
  }

  public getPayPalURL(resourceUrl: string): string {
    return environment.PAY_PAL_URL + resourceUrl;
  }
}
