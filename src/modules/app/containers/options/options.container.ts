import {Component, OnInit} from '@angular/core';
import {Option} from '../../types/option.type';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {filter, map, publishReplay, refCount} from 'rxjs/operators';

@Component({
  selector: 'app-options',
  styleUrls: ['./options.container.scss'],
  template: `
    <div class="row">
      <div class="col-sm-7 col-md-8">
        <h2>Packs</h2>
        <br>
        <app-option-list [options]="[]"
                         (addOption)="onAddOption($event)"
                         (removeOption)="onRemoveOption($event)"></app-option-list>
        <h2>Options</h2>
        <br>
        <app-option-list [options]="[]"
                         (addOption)="onAddOption($event)"
                         (removeOption)="onRemoveOption($event)"></app-option-list>
      </div>
      <div class="col-sm-5 col-md-4">
        <app-side-bar [car]="null"
                      [selectedOptions]="[]"
                      [leasePrice]="null"
                      [selectedOptionsEnabled]="true">
        </app-side-bar>
      </div>
    </div>
  `
})
export class OptionsContainer implements OnInit {
  // source streams
  carId$: Observable<string>;


  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // source streams
    this.carId$ = this.activatedRoute.params.pipe(
      filter(params => params && params.carId),
      map(params => params.carId),
      publishReplay(1),
      refCount()
    );
  }

  onAddOption(option: Option): void {
  }

  onRemoveOption(optionId: string): void {
  }
}
