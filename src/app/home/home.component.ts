import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {KasboekenComponent} from '../kasboeken/kasboeken.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, KasboekenComponent],
  template: `
    <section>
      <h3>
        <a [routerLink]="['/kasboeken']">Kasboeken</a> | Aanwezigheden | Krantje
      </h3>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
}
