import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, HomeComponent
  ],
  template: `
    <main>

        <header class="brand-name">
          <a [routerLink]="['/']">
          <!--<img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">-->
          <h1>Adminello</h1>
          </a>
          <h4><i>Administratieve tools voor Poverello vzw</i></h4>
        </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
}
