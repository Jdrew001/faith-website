import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { isNullOrUndefined } from 'util';
import { AdministrationService } from '../../administration.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private store: Store, private administrationService: AdministrationService) { }

  ngOnInit() {
    this.administrationService.validateSystemModule('User_Management', this.store.selectSnapshot(TokenState.systemModules));
  }

}
