import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { TimelineComponent } from './components/experience/timeline/timeline.component';
import { ContactComponent } from './components/contact/contact.component';
import { StackComponent } from './components/stack/stack.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    TimelineComponent,
    ContactComponent,
    StackComponent,
  ],
})
export class AppComponent {}
