import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Technology } from '../../models/technology.model';

@Component({
  selector: 'app-tech-pill',
  templateUrl: './tech-pill.component.html',
  imports: [CommonModule],
})
export class TechPillComponent {
  @Input() tech!: Technology;
  @Input() compact = false;

  openUrl(): void {
    if (this.tech.url) {
      window.open(this.tech.url, '_blank', 'noopener,noreferrer');
    }
  }
}
