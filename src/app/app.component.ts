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
      <a [routerLink]="['/']">
        <header class="brand-name">
          <!--<img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">-->
          <h1>Poverello Applicaties</h1>
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
}
