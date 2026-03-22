import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  imports: [TranslateModule],
})
export class AboutComponent {
  yearsOfExperience = new Date().getFullYear() - 2023;
}
