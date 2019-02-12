import { Injectable } from '@angular/core';
import { Option } from '../types/option.type';
import {
  Observable,
  of
} from 'rxjs';

@Injectable()
export class OptionService {
  private options: Option[] = [
    {
      optionId: '1',
      description: 'Technology pack',
      optionCode: '123',
      optionType: 'pack',
      price: 1500,
      isSelected: false
    },
    {
      optionId: '2',
      description: 'Business pack',
      optionCode: '124',
      optionType: 'pack',
      price: 3200,
      isSelected: false
    },
    {
      optionId: '3',
      description: 'Tow bar',
      optionCode: '452',
      optionType: 'option',
      price: 980,
      isSelected: false
    },
    {
      optionId: '4',
      description: 'Heated front window',
      optionCode: '554',
      optionType: 'option',
      price: 700,
      isSelected: false
    },
    {
      optionId: '5',
      description: 'Heated steering wheel',
      optionCode: '783',
      optionType: 'option',
      price: 150,
      isSelected: false
    }
  ];

  find(carId: string): Observable<Option[]> {
    return of(this.options);
  }
}
