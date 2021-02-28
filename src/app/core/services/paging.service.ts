import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  constructor() { }

  updateList(items: any[], page, max) {
    let tempList = items;
    return tempList.slice(this.getMin(page, max), this.getMax(page, max));
  }

  detectPageCount(items: any[], maxItems) {
    let index = items.length > maxItems ? (Math.floor(items.length / maxItems)) + 1 : 1;
    let pageNums = [];
    for (let i = 0; i < index; i++) {
      pageNums.push(i + 1);
    }
    return pageNums
  }

  private getMin(page, max) {
    return ( page-=1 ) * max;
  }

  private getMax(page, max) {
    return page * max;
  }
}
