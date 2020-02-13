import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Option} from '../../types/option.type';
import {filter, map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-summary',
  template: `
    <div class="row">
      <div class="col-sm-7 col-md-8">
        <h2>Selected options</h2>
        <br>
        <app-option-list [options]="[]" [disabled]="true"></app-option-list>
      </div>
      <div class="col-sm-5 col-md-4">
        <app-side-bar [car]="null"
                      [leasePrice]="null"></app-side-bar>
      </div>
    </div>
  `
})
export class SummaryContainer implements OnInit {
  // source streams
  carId$: Observable<string>;

  // presentation streams
  selectedOptions$: Observable<Option[]>;


  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // source streams
    this.carId$ = this.activatedRoute.params.pipe(
      filter(params => params && params.carId),
      map(params => params.carId)
    );
  }
}
