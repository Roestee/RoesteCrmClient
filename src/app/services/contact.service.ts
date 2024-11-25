import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: ContactModel[]) => void) {
    this.http.get<ContactModel[]>('Contacts/GetAll', callBack);
  }

  getById(id: string, callBack: (res: ContactModel) => void) {
    this.http.get<ContactModel>(`Contacts/GetById/${id}`, callBack);
  }

  create(
    model: ContactModel,
    callBack: (res: ContactModel, message?: string) => void
  ) {
    this.http.post('Contacts/Create', model, callBack);
  }

  update(
    model: ContactModel,
    callBack: (res: ContactModel, message?: string) => void
  ) {
    this.http.put('Contacts/Update', model, callBack);
  }

  deleteById(
    id: string,
    callBack: (res: ContactModel, message?: string) => void
  ) {
    this.http.delete('Contacts/DeleteById', id, callBack);
  }
}
