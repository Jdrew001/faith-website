import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListView } from '../../list-view';
import { PagingService } from 'src/app/core/services/paging.service';

@Component({
  selector: 'app-a-subscribe-list',
  templateUrl: './a-subscribe-list.component.html',
  styleUrls: ['./a-subscribe-list.component.css']
})
export class ASubscribeListComponent extends ListView implements OnInit, OnChanges {

  @Input('subscribers') subscribers = [];

  constructor(protected pagingService: PagingService) {
    super(pagingService);
  }

  ngOnInit() {
    this.MaxItems = 10;
    this.initializeListPaging();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.subscribers) {
      console.log(this.subscribers);
      this.data = this.subscribers;
      this.initializeListPaging();
    }
  }

}
