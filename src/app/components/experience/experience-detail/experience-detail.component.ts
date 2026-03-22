import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Experience } from '../../../models/experience.model';
import { TechPillComponent } from '../../tech-pill/tech-pill.component';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  imports: [CommonModule, TranslateModule, TechPillComponent],
})
export class ExperienceDetailComponent {
  @Input() exp!: Experience;
  @Output() close = new EventEmitter<void>();

  formatDate(date: string | null): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  }
}
