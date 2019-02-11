import { Component } from '@angular/core';
import { Option } from '../../types/option.type';

@Component({
  selector: 'app-options',
  styleUrls: ['./options.container.scss'],
  template: `
    <h1>Options</h1>
    <br>
    <div class="row">
      <div class="col-8">
        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>Description</th>
            <th>Option code</th>
            <th class="text-right">Price</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let option of options">
            <td>
              <input type="checkbox" name="" id="">
            </td>
            <td>{{option?.description}}</td>
            <td>{{option?.optionCode}}</td>
            <td class="text-right">{{option?.price | currency}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-4">
        <div class="filters">

        </div>
      </div>
    </div>
  `
})
export class OptionsContainer {
  options: Option[] = [
    {
      optionId: '1',
      description: 'Technology pack',
      optionCode: 'ABC123',
      price: 1500
    },
    {
      optionId: '2',
      description: 'Heated seats',
      optionCode: 'ABC124',
      price: 700
    }
  ];

  // source streams

}
