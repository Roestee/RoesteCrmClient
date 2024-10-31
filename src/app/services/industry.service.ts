import { Injectable } from '@angular/core';
import { IndustryModel } from '../models/industry.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class IndustryService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: IndustryModel[]) => void) {
    this.http.get<IndustryModel[]>('Industries/GetAll', callBack);
  }
}
