import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SpriteService {
  private loaded = false;

  constructor(private http: HttpClient) {}

  loadSprite(): Promise<void> {
    if (this.loaded) return Promise.resolve();

    return new Promise((resolve) => {
      this.http.get('/sprite.svg', { responseType: 'text' }).subscribe((svg) => {
        const container = document.getElementById('sprite-container');
        if (container) container.innerHTML = svg;

        this.loaded = true;
        resolve();
      });
    });
  }
}
