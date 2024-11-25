import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AccountModel } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: AccountModel[]) => void) {
    this.http.get<AccountModel[]>('Accounts/GetAllWithDetail', callBack);
  }

  getById(id: string, callBack: (res: AccountModel) => void) {
    this.http.get<AccountModel>(`Accounts/GetByIdWithDetail/${id}`, callBack);
  }

  create(
    model: AccountModel,
    callBack: (res: AccountModel, message?: string) => void
  ) {
    this.http.post('Accounts/Create', model, callBack);
  }

  update(
    model: AccountModel,
    callBack: (res: AccountModel, message?: string) => void
  ) {
    this.http.put('Accounts/Update', model, callBack);
  }

  deleteById(
    id: string,
    callBack: (res: AccountModel, message?: string) => void
  ) {
    this.http.delete('Accounts/DeleteById', id, callBack);
  }
}
