import {
  PagingService
} from 'src/app/core/services/paging.service';

export class ListView {

  pages: number[] = [];
  tempPages: number[] = [];
  activePage = 1;
  private maxItems = 20;
  data = [];
  tempData = [];

  constructor(protected pagingService: PagingService) {}

  // method helps the paging items when you traverse through each page
  updatePaging(type) {
    switch (type) {
      case 'up':
        if (this.tempPages[this.tempPages.length - 1] !== this.pages[this.pages.length - 1]) {
          this.tempPages = this.pages;
          this.tempPages = this.tempPages.slice(this.activePage - 1, this.activePage + 4);
        }
        break;
      case 'down':
        console.log(this.activePage === this.tempPages[0]);
        if (this.activePage + 1 === this.tempPages[0]) {
          this.tempPages = this.pages;
          this.tempPages = this.tempPages.slice(this.activePage - 1, this.activePage + 4);
        }
        break;
    }
  }

  changePage(type) {
    if (type === 'up') {
      this.activePage = this.activePage + 1;
      this.updatePaging('up');
      this.updateTempData();
      return;
    }
    this.activePage = this.activePage - 1
    this.updatePaging('down');
    this.updateTempData();
  }

  initializeListPaging() {
    this.pages = this.pagingService.detectPageCount(this.data, this.maxItems);
    this.tempPages = this.pages;
    this.tempPages = this.tempPages.slice(this.activePage - 1, this.activePage + 4);
    this.tempData = this.pagingService.updateList(this.data, this.activePage, this.maxItems);
  }

  updateTempData() {
    this.tempData = this.pagingService.updateList(this.data, this.activePage, this.maxItems);
  }

  protected get MaxItems(): number {
    return this.maxItems
  }

  protected set MaxItems(v: number) {
    this.maxItems = v;
  }

  protected get ActivePage() : number {
      return this.activePage;
  }

  protected set ActivePage(v : number) {
      this.activePage = v;
  }
}
