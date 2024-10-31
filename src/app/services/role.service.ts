import { Injectable } from '@angular/core';
import { RoleModel } from '../models/role.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: RoleModel[]) => void) {
    this.http.get<RoleModel[]>('Roles/GetAll', callBack);
  }

  create(
    model: RoleModel,
    callBack: (res: RoleModel, message?: string) => void
  ) {
    this.http.post<RoleModel>('Roles/Create', model, callBack);
  }

  update(
    model: RoleModel,
    callBack: (res: RoleModel, message?: string) => void
  ) {
    this.http.put<RoleModel>('Roles/Update', model, callBack);
  }

  deleteById(
    model: RoleModel,
    callBack: (res: RoleModel, message?: string) => void
  ) {
    this.http.delete<RoleModel>('Roles/DeleteById', model.id, callBack);
  }
}
