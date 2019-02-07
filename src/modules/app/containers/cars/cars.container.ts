import { Component } from '@angular/core';

@Component({
  selector: 'app-cars',
  styleUrls: ['./cars.container.scss'],
  template: `
    <h1>List of cars</h1>
    <app-car-list [cars]="cars"></app-car-list>
  `
})
export class CarsContainer {
  cars: { make: string; model: string; type: string; imgUrl: string; }[] = [
    {
      make: 'Audi',
      model: 'A3 Sportback',
      type: '1.6 30 TDi 85kW',
      imgUrl: 'https://www.nl.audi.be/content/dam/nemo/models/a3/a3-sportback/my-2019/1920x1080-mtc-xl-16-9/AA3_SB_161005_1.jpg'
    },
    {
      make: 'BMW',
      model: '1 Series',
      type: '1.6 30 TDi 85kW',
      imgUrl: 'https://media2.autokopen.nl/afbeeldingen/bmw-1-serie-271020-1024.jpg'
    },
    {
      make: 'Mercedes',
      model: 'A Class',
      type: '1.6 30 TDi 85kW',
      imgUrl: 'https://www.topgear.nl/thumbs/hd/2018/02/nieuwe-mercedes-a-klasse-2018-8.jpg'
    },
    {
      make: 'Volkswagen',
      model: 'Golf',
      type: '1.6 30 TDi 85kW',
      imgUrl: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/volkswagen-golf_0.jpg?itok=gf0XwLxI'
    }
  ];
}
