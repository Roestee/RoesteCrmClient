import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UserResponseModel } from '../models/user.response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: UserResponseModel[]) => void) {
    this.http.get<UserResponseModel[]>('Users/GetAllWithRoles', callBack);
  }

  create(
    user: UserResponseModel,
    callBack: (res: UserResponseModel, message?: string) => void
  ) {
    this.http.post<UserResponseModel>('Users/Create', user, callBack);
  }

  update(
    user: UserResponseModel,
    callBack: (res: UserResponseModel, message?: string) => void
  ) {
    this.http.put<UserResponseModel>('Users/Update', user, callBack);
  }

  deleteById(
    user: UserResponseModel,
    callBack: (res: UserResponseModel, message?: string) => void
  ) {
    this.http.delete<UserResponseModel>('Users/DeleteById', user.id, callBack);
  }
}
