import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LeadStatusModel } from '../models/lead.status.model';

@Injectable({
  providedIn: 'root',
})
export class LeadStatusService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: LeadStatusModel[]) => void) {
    this.http.get<LeadStatusModel[]>('LeadStatuses/GetAll', callBack);
  }
}
