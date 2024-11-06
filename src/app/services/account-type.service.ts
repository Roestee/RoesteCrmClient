import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AccountTypeModel } from '../models/account.type.model';

@Injectable({
  providedIn: 'root',
})
export class AccountTypeService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: AccountTypeModel[]) => void) {
    this.http.get('AccountTypes/GetAll', callBack);
  }
}
