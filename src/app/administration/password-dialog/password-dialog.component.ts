import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { SubscribeService } from 'src/app/core/services/subscribe.service';
import { UserService } from '../user/user-management/user.service';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { Store } from '@ngxs/store';
import { PasswordModel } from './password.model';
import { UpdateUserStatusAction } from 'src/app/shared/store/token/actions/updateUserStatus.action';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {

  passwordResetForm = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z].{8,}')]),
    confirmPassword: new FormControl(null, [Validators.required])
  });
  passwordResetSubmitted = false;
  passwordModel: PasswordModel;
  subscription: any;
  @ViewChild('modal') modal:any;

  constructor(private store: Store, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
    setTimeout(() => {
      const isNewUser = this.store.selectSnapshot(TokenState.isNewUser);
      if (!isNullOrUndefined(isNewUser)) {
        if (isNewUser) {
          this.modal.show();
        }
      }
    }, 2500);
  }

  changePassword() {
    this.passwordResetSubmitted = true;
    if (this.passwordResetForm.valid) {
      // check to see if the new password and confirm password are the same
      if (this.passwordResetForm.controls['newPassword'].value === this.passwordResetForm.controls['confirmPassword'].value) {
        this.passwordModel = {
          email: this.store.selectSnapshot(TokenState.userEmail),
          password: this.passwordResetForm.controls['newPassword'].value,
          currentPassword: this.passwordResetForm.controls['currentPassword'].value
        };
        console.log(this.passwordModel);
        this.userService.updateUserPassword(this.passwordModel).subscribe(() => {
          this.store.dispatch(new UpdateUserStatusAction(false));
          this.modal.hide();
          this.notificationService.displaySuccess('Successfully updated password', '');
        }, error => {
          console.log(error['error'].message);
          this.notificationService.displayError(error['error'].message, '');
        });
      }
    }
  }

}
