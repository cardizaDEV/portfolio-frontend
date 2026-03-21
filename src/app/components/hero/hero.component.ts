import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TechnologyService } from '../../services/technology.service';
import { TechPillComponent } from '../tech-pill/tech-pill.component';
import { Technology } from '../../models/technology.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports: [CommonModule, TranslateModule, TechPillComponent],
})
export class HeroComponent implements OnInit, OnDestroy {
  technologies: Technology[] = [];
  offset = 0;
  isMobile = window.innerWidth < 768;
  private interval?: ReturnType<typeof setInterval>;

  constructor(private technologyService: TechnologyService) {}

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth < 768;
    this.offset = 0;
    this.restartScroll();
  }

  ngOnInit(): void {
    this.technologyService.technologies$.subscribe((data) => {
      this.technologies = [...data, ...data];
      setTimeout(() => this.startScroll(), 0);
    });
  }

  private get itemSize(): number {
    return this.isMobile ? 140 : 44;
  }

  private startScroll(): void {
    this.interval = setInterval(() => {
      this.offset += 1;
      if (this.offset >= this.itemSize * (this.technologies.length / 2)) {
        this.offset = 0;
      }
    }, 30);
  }

  private restartScroll(): void {
    clearInterval(this.interval);
    this.startScroll();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  scrollToProjects(): void {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}