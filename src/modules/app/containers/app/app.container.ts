import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.container.scss'],
  template: `
    <div class="container">
      <div class="nav-bar">
        <img class="logo" src="assets/sofico-rgb-small.svg"/>
        <a class="btn btn-secondary" href="https://www.sofico.global/jobs" target="_blank">Jobs @ Sofico</a>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppContainer {

}
