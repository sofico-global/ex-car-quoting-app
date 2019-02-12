import { Injectable } from '@angular/core';
import { Option } from '../types/option.type';
import {
  Observable,
  of
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class OptionService {
  constructor(private httpClient: HttpClient) {}

  find(carId: string): Observable<Option[]> {
    return this.httpClient.get<Option[]>(environment.baseUrl + 'options/' + carId);
  }
}
