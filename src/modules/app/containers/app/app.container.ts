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
      <p class="alert alert-secondary">
        As part of Sofico you're allowed to configure your next company car! <strong><a
        href="https://twitter.com/search?q=%23wearesofico" target="_blank">#wearesofico</a></strong>
      </p>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppContainer {

}
