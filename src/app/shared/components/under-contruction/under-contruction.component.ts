import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';

@Component({
  selector: 'app-under-contruction',
  templateUrl: './under-contruction.component.html',
  styleUrls: ['./under-contruction.component.css']
})
export class UnderContructionComponent implements OnInit {

  imageUrl: string;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.imageUrl = this.helperService.getResourceUrl('images/underconstruction.jpg', true);
  }

}
