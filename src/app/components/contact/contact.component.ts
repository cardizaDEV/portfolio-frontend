import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  sending = false;
  sent = false;
  error = false;

  readonly github = 'https://github.com/cardizaDEV';
  readonly linkedin = 'https://linkedin.com/in/adriancarneirodiz';
  readonly emailAddress = 'adriancarndi@gmail.com';

  constructor(private http: HttpClient) {}

  send(): void {
    if (!this.name || !this.email || !this.message) return;
    this.sending = true;
    this.error = false;
    this.http
      .post(`${environment.apiUrl}/contact`, {
        name: this.name,
        email: this.email,
        message: this.message,
      })
      .subscribe({
        next: () => {
          this.sent = true;
          this.sending = false;
          this.name = '';
          this.email = '';
          this.message = '';
        },
        error: () => {
          this.error = true;
          this.sending = false;
        },
      });
  }

  openUrl(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
