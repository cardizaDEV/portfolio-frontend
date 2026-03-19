import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TechnologyService } from '../../services/technology.service';
import { Technology } from '../../models/technology.model';
import { CommonModule } from '@angular/common';
import { SpriteService } from '../../services/sprite.service';

@Component({
  selector: 'app-technology-carousel',
  templateUrl: './technology-carousel.component.html',
  styleUrl: './technology-carousel.component.css',
  imports: [CommonModule],
})
export class TechnologyCarouselComponent implements OnInit {
  @ViewChild('track', { static: true }) track!: ElementRef;

  technologies: Technology[] = [];

  constructor(
    private technologyService: TechnologyService,
    private spriteService: SpriteService,
    private cdr: ChangeDetectorRef,
  ) {}

  openUrl(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  async ngOnInit() {
    this.technologyService.getTechnologies().subscribe((data: Technology[]) => {
      this.technologies = data;
      this.cdr.detectChanges();
    });
    await this.spriteService.loadSprite();
  }
}
