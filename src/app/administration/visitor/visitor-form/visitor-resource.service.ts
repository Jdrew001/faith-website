import { Injectable } from '@angular/core';
import { GenericResourceService } from 'src/app/core/services/generic-resource.service';
import { VisitorModel } from './models/Visitor.model';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/core/services/helper.service';
import { VisitorConst } from './models/visitor.constant';

@Injectable()
export class VisitorResourceService extends GenericResourceService<VisitorModel, number, string> {

  constructor(protected http: HttpClient, protected helperService: HelperService) {
    super(http, helperService.getResourceUrl(VisitorConst.VISITOR_BASE, false));
  }
}
