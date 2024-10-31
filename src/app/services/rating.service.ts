import { Injectable } from '@angular/core';
import { RatingModel } from '../models/rating.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private http: HttpService) {}

  getAll(callBack: (res: RatingModel[]) => void) {
    this.http.get<RatingModel[]>('Ratings/GetAll', callBack);
  }
}
