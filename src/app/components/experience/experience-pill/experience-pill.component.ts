import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Experience } from '../../../models/experience.model';

@Component({
  selector: 'app-experience-pill',
  templateUrl: './experience-pill.component.html',
  imports: [CommonModule, TranslateModule],
})
export class ExperiencePillComponent {
  @Input() exp!: Experience;
  @Input() isPinned = false;
  @Output() openDetail = new EventEmitter<Experience>();

  formatDate(date: string | null): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  }
}
