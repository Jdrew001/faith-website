import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NavbarComponent, LinksComponent } from 'ng-uikit-pro-standard';
import { SubscribeService } from 'src/app/core/services/subscribe.service';
import { HelperService } from 'src/app/core/services/helper.service';
import { SharedConstants } from '../shared-constants';
import { ScrollService } from '../scroll.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @ViewChild('navbar') navbar: NavbarComponent;
  @ViewChild('links') links: LinksComponent;
  logoUrl: string;
  showNavigation: boolean = true;

  constructor(
    private subscribeService: SubscribeService,
    private helperService: HelperService,
    private router: Router,
    private scrollService: ScrollService
    ) { }

  ngOnInit() {
    this.logoUrl = this.helperService.getResourceUrl('images/faith_tab_logo_white.png', true);
    this.validateNavigation();
    this.menuSubscription();
  }

  menuSubscription() {
    this.scrollService.menuService$.subscribe(val => {
      if (val && this.navbar.shown) {
        this.navbar.hide()
      }
    })
  }

  toggleNavbar(event) {
    this.navbar.toggle();
  }

  validateNavigation() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event);
        SharedConstants.EXCLUDED_URLS.forEach(val => {
          console.log(event.url === val);
          if (val === event.url) {
            this.showNavigation = false;
            return;
          }
        });
      }
    });
  }

  changeUrl(url) {
    console.log("LOGGED: ", url);
    this.subscribeService.urlChanged(url);
  }
}
