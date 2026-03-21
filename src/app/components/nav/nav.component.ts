import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  imports: [CommonModule, TranslateModule],
})
export class NavComponent {
  currentLang = 'es';
  menuOpen = false;

  navLinks = [
    { id: 'about', key: 'NAV.ABOUT' },
    { id: 'stack', key: 'NAV.STACK' },
    { id: 'experience', key: 'NAV.EXPERIENCE' },
    { id: 'projects', key: 'NAV.PROJECTS' },
    { id: 'contact', key: 'NAV.CONTACT' },
  ];

  constructor(private translate: TranslateService) {
    this.translate.use(this.currentLang);
  }

  setLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  scrollTo(sectionId: string): void {
    this.menuOpen = false;
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
