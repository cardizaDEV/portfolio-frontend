import { TechnologyCategory } from './technology-category.model';

export interface Technology {
  id: number;
  name: string;
  url: string;
  categories: TechnologyCategory[];
}
