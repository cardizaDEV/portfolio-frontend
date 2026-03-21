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

  downloadCv(): void {
    const link = document.createElement('a');
    link.href = `${window.location.origin}/${this.currentLang === 'es' ? 'cv-es.pdf' : 'cv-en.pdf'}`;
    link.download = `cv-adrian-carneiro-${this.currentLang}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  scrollTo(sectionId: string): void {
    this.menuOpen = false;
    const el = document.getElementById(sectionId);
    if (el) {
      const navHeight = 64;
      const offset = el.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
