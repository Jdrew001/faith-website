import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { LoginConstant } from './login.constant';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoginModel } from './login.model';
import { Store } from '@ngxs/store';
import { LoginAction } from 'src/app/shared/store/token/actions/login.action';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router, NavigationExtras } from '@angular/router';
import { SubscribeService } from 'src/app/core/services/subscribe.service';
import { of } from 'rxjs';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { CoreConstant } from 'src/app/core/core.constant';
import { LoaderService } from 'src/app/core/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logoUrl = '';
  formSubmitted = false;
  loginModel: LoginModel;
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private helperService: HelperService, private notificationService: NotificationService, private store: Store,
    private authenticationService: AuthenticationService, private router: Router, private subscribeService: SubscribeService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.loadAssets();
  }

  loadAssets() {
    this.logoUrl = this.helperService.getResourceUrl(LoginConstant.LOGO, true);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.loginModel = this.loginForm.value;
      this.loaderService.toggleLoader(true);
      this.store.dispatch(new LoginAction(this.loginModel)).subscribe(data => {
        this.loaderService.toggleLoader(false);
        if (this.store.selectSnapshot(TokenState.username) === CoreConstant.VISITOR_USER) {
          this.router.navigateByUrl('/visitor-greeter');
        } else {
          this.router.navigateByUrl('/administration/dashboard');
        }
      }, error => {
        this.loaderService.toggleLoader(false);
        this.notificationService.displayError('Username or password is invalid.', 'Login Failure');
      });
    } else {
      this.notificationService.displayError('Please fill in the required items.', 'Form Error');
    }
  }

  logout() {
    this.authenticationService.logout();
    //this.authenticationService.logout();
    // TODO: emit some event notify the auth that it needs to redirect user to login page
  }
}
