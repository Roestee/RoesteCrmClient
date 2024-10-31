import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LeadModel } from '../models/lead.model';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: LeadModel[]) => void) {
    this.http.get<LeadModel[]>('Leads/GetAllWithDetail', callBack);
  }

  getById(id: string, callBack: (res: LeadModel) => void) {
    this.http.get<LeadModel>(`Leads/GetByIdWithDetail/${id}`, callBack);
  }

  create(
    lead: LeadModel,
    callBack: (res: LeadModel, message?: string) => void
  ) {
    this.http.post<LeadModel>('Leads/Create', lead, callBack);
  }

  update(
    lead: LeadModel,
    callBack: (res: LeadModel, message?: string) => void
  ) {
    this.http.put<LeadModel>('Leads/Update', lead, callBack);
  }

  deleteById(
    lead: LeadModel,
    callBack: (res: LeadModel, message?: string) => void
  ) {
    this.http.delete<LeadModel>('Leads/DeleteById', lead.id, callBack);
  }
}
