import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ExperienceService } from '../../../services/experience.service';
import { Experience } from '../../../models/experience.model';
import { ExperienceCategory } from '../../../models/experience-category.model';
import { ExperiencePillComponent } from '../experience-pill/experience-pill.component';
import { ExperienceDetailComponent } from '../experience-detail/experience-detail.component';

export interface TimelinePoint {
  experiences: Experience[];
  percent: number;
  lineHeight: number;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  imports: [CommonModule, TranslateModule, ExperiencePillComponent, ExperienceDetailComponent],
})
export class TimelineComponent implements OnInit {
  experiences: Experience[] = [];
  lanes: ExperienceCategory[] = [];
  points: TimelinePoint[] = [];
  hoveredExp: Experience | null = null;
  hoverVisualId: number | null = null;
  pinnedExp: Experience | null = null;
  detailExp: Experience | null = null;
  pillX = 0;
  pillY = 0;

  private readonly PADDING_MS = 1000 * 60 * 60 * 24 * 30 * 6;
  private readonly MIN_DISTANCE = 3;
  private readonly LINE_HEIGHTS = [40, 24, 56, 16, 48, 32];
  private barPercents = new Map<number, { left: number; width: number }>();
  private start = 0;
  private end = 0;
  private duration = 0;

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.experienceService.experiences$.subscribe((data) => {
      this.experiences = data.sort(
        (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
      this.computeRange();
      this.buildLanes();
      this.buildPoints();
      this.cacheBarPercents();
    });
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('app-experience-pill') && !target.closest('.timeline-dot')) {
      this.pinnedExp = null;
      this.hoveredExp = null;
    }
  }

  get visibleExp(): Experience | null {
    return this.pinnedExp ?? this.hoveredExp;
  }

  private computeRange(): void {
    const now = Date.now();
    this.start =
      Math.min(...this.experiences.map((e) => new Date(e.startDate).getTime())) - this.PADDING_MS;
    this.end =
      Math.max(
        ...this.experiences.map((e) => (e.endDate ? new Date(e.endDate).getTime() : now)),
        now,
      ) + this.PADDING_MS;
    this.duration = this.end - this.start;
  }

  private pct(date: string | null): number {
    const d = date ? new Date(date).getTime() : Date.now();
    return ((d - this.start) / this.duration) * 100;
  }

  private buildLanes(): void {
    const seen = new Set<string>();
    this.lanes = [];
    for (const exp of this.experiences) {
      if (!seen.has(exp.category.name)) {
        seen.add(exp.category.name);
        this.lanes.push(exp.category);
      }
    }
  }

  private buildPoints(): void {
    const groups: TimelinePoint[] = [];
    let i = 0;
    for (const exp of this.experiences) {
      const percent = this.pct(exp.startDate);
      const existing = groups.find((g) => Math.abs(g.percent - percent) < this.MIN_DISTANCE);
      if (existing) {
        existing.experiences.push(exp);
      } else {
        groups.push({
          experiences: [exp],
          percent,
          lineHeight: this.LINE_HEIGHTS[i % this.LINE_HEIGHTS.length],
        });
        i++;
      }
    }
    this.points = groups;
  }

  private cacheBarPercents(): void {
    for (const exp of this.experiences) {
      const left = this.pct(exp.startDate);
      const start = new Date(exp.startDate).getTime();
      const end = exp.endDate ? new Date(exp.endDate).getTime() : Date.now();
      const width = ((end - start) / this.duration) * 100 - 0.3;
      this.barPercents.set(exp.id, { left, width });
    }
  }

  onDotEnter(event: MouseEvent, exp: Experience): void {
    this.hoverVisualId = exp.id;
    if (this.pinnedExp) return;
    this.hoveredExp = exp;
    this.updatePillPosition(event);
  }

  onDotLeave(): void {
    this.hoverVisualId = null;
    if (this.pinnedExp) return;
    this.hoveredExp = null;
  }

  onDotClick(event: MouseEvent, exp: Experience): void {
    event.stopPropagation();
    if (this.pinnedExp?.id === exp.id) {
      this.pinnedExp = null;
    } else {
      this.pinnedExp = exp;
      this.hoveredExp = null;
      this.updatePillPosition(event);
    }
  }

  private updatePillPosition(event: MouseEvent): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const container = document.getElementById('timeline-container')!.getBoundingClientRect();

    const pillWidth = 320;
    const margin = 8;
    const center = rect.left + rect.width / 2;

    this.pillX = Math.min(
      Math.max(margin, center - pillWidth / 2 - container.left),
      container.width - pillWidth - margin,
    );
    this.pillY = rect.top - container.top - 10;
  }

  getBarLeft(exp: Experience): number {
    return this.barPercents.get(exp.id)?.left ?? 0;
  }

  getBarWidth(exp: Experience): number {
    return this.barPercents.get(exp.id)?.width ?? 0;
  }

  byCategory(name: string): Experience[] {
    return this.experiences.filter((e) => e.category.name === name);
  }

  formatDate(date: string | null): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  }
}
