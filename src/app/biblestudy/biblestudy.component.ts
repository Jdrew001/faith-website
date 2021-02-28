import { Component, OnInit, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { BiblestudyConstant } from './biblestudy.constant';
import { CarouselModule } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biblestudy',
  templateUrl: './biblestudy.component.html',
  styleUrls: ['./biblestudy.component.css']
})
export class BiblestudyComponent implements OnInit {

  @ViewChild('carousel') carousel: CarouselModule;

  headingImgUrl = "";
  cardImgUrl = ""
  slides: any = [[]];
  carouselDisplayMode = 'multiple';
  cards = [
    {
      title: 'Card Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 2',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 3',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 4',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 5',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 6',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 7',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 8',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 9',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
  ];

  constructor(private helperService: HelperService, private router: Router, private ref: ChangeDetectorRef) {
    
  }

  ngOnInit() {
    this.headingImgUrl = this.helperService.getResourceUrl(BiblestudyConstant.HEADING_IMAGE, true);
    this.cardImgUrl = this.helperService.getResourceUrl(BiblestudyConstant.BIBLESTUDY_FILL, true);
    this.slides = this.chunk(this.cards, 3);
    this.screenInit();
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenWidth(window.innerWidth);
  }

  screenInit() {
    this.checkScreenWidth(window.innerWidth);
  }

  checkScreenWidth(screen) {
    if (screen < 765) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'multiple';
    }
  }

}
