import { Component, OnInit, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TechnologyCarouselComponent } from './components/technologies-carousel/technology-carousel.component';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, TechnologyCarouselComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
