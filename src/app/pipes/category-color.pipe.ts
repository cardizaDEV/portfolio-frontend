import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'categoryColor', standalone: true })
export class CategoryColorPipe implements PipeTransform {
  transform(categories: { key: string; color: string }[], categoryKey: string): string {
    return categories.find((c) => c.key === categoryKey)?.color ?? '#6e6e68';
  }
}