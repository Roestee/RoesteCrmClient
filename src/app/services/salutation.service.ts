import { Injectable } from '@angular/core';
import { SalutationModel } from '../models/salutation.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SalutationService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: SalutationModel[]) => void) {
    this.http.get<SalutationModel[]>('Salutations/GetAll', callBack);
  }
}
