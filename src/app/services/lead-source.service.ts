import { Injectable } from '@angular/core';
import { LeadSourceModel } from '../models/lead.source.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LeadSourceService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: LeadSourceModel[]) => void) {
    this.http.get<LeadSourceModel[]>('LeadSources/GetAll', callBack);
  }
}
