import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListView } from '../../list-view';
import { PagingService } from 'src/app/core/services/paging.service';

@Component({
  selector: 'app-a-group-list',
  templateUrl: './a-group-list.component.html',
  styleUrls: ['./a-group-list.component.css']
})
export class AGroupListComponent extends ListView implements OnInit, OnChanges {
  
  @Input('groups') groups = [];

  constructor(protected pagingService: PagingService) {
    super(pagingService);
  }

  ngOnInit() {
    this.MaxItems = 5;
    super.initializeListPaging();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.groups) {
      this.data = this.groups;
      super.initializeListPaging();
    }
  }
}
