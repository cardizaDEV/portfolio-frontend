import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SpriteService } from '../../services/sprite.service';
import { TechnologyService } from '../../services/technology.service';
import { Technology } from '../../models/technology.model';
import { TechPillComponent } from '../tech-pill/tech-pill.component';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  imports: [TranslateModule, TechPillComponent],
})
export class StackComponent {
  technologies: Technology[] = [];

  constructor(
    private technologyService: TechnologyService,
    private spriteService: SpriteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.technologyService.getTechnologies().subscribe((data) => {
      debugger;
      this.technologies = [...data, ...data];
      this.cdr.detectChanges();
    });
    this.spriteService.loadSprite();
  }
}
