import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SpriteService } from '../../services/sprite.service';
import { TechnologyService } from '../../services/technology.service';
import { Technology } from '../../models/technology.model';
import { TechnologyCategory } from '../../models/technology-category.model';
import { TechPillComponent } from '../tech-pill/tech-pill.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  imports: [TranslateModule, TechPillComponent, CommonModule],
})
export class StackComponent {
  technologies: Technology[] = [];
  categories: TechnologyCategory[] = [];
  selectedCategory: TechnologyCategory | null = null;

  constructor(
    private technologyService: TechnologyService,
    private spriteService: SpriteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.technologyService.technologies$.subscribe((data) => {
      this.technologies = data;
      this.categories = this.extractCategories(data);
      this.cdr.detectChanges();
    });
    this.spriteService.loadSprite();
  }

  private extractCategories(technologies: Technology[]): TechnologyCategory[] {
    const map = new Map<number, TechnologyCategory>();
    technologies.forEach((t) =>
      t.categories.forEach((c) => {
        if (!map.has(c.id)) map.set(c.id, c);
      }),
    );
    return Array.from(map.values());
  }

  get filteredTechnologies(): Technology[] {
    const filtered = !this.selectedCategory
      ? this.technologies
      : this.technologies.filter((t) =>
          t.categories.some((c) => c.id === this.selectedCategory!.id),
        );
    return filtered.sort((a, b) => a.name.length - b.name.length);
  }

  selectCategory(cat: TechnologyCategory | null): void {
    this.selectedCategory = cat;
  }
}
