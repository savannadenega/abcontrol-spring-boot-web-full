import { Component } from '@angular/core';
import { links } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ABControl';
  links = [];
  
  constructor () {
    this.links = links;
  }
}
