import { Injectable } from '@angular/core';
import { GenericResourceService } from 'src/app/core/services/generic-resource.service';
import { VisitorModel } from './models/Visitor.model';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/core/services/helper.service';
import { VisitorConst } from './models/visitor.constant';

@Injectable()
export class VisitorResourceService {

  constructor(protected http: HttpClient, protected helperService: HelperService) {
  }

  save(data) {
    const url = this.helperService.getCMSResource(VisitorConst.VISITOR_BASE);
    return this.http.post(url, data);
  }
}
