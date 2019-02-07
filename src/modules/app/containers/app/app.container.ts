import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.container.scss'],
  template: `
    <div class="container">
      <h1>Sofico Leasing Services</h1>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppContainer {

}
