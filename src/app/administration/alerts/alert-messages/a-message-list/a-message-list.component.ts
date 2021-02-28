import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PagingService } from 'src/app/core/services/paging.service';
import { ListView } from '../../list-view';

@Component({
  selector: 'app-a-message-list',
  templateUrl: './a-message-list.component.html',
  styleUrls: ['./a-message-list.component.css']
})
export class AMessageListComponent extends ListView implements OnInit, OnChanges {

  @Input('messages') messages = [];

  constructor(protected pagingService: PagingService) {
    super(pagingService);
  }

  ngOnInit() {
    this.MaxItems=20;
    super.initializeListPaging();
    console.log(this.ActivePage);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.messages) {
      this.data = this.messages;
      super.initializeListPaging();
    }
  }

}