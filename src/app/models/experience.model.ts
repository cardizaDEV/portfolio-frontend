import { Organization } from './organization.model';
import { ExperienceStatus } from './experience-status.model';
import { ExperienceCategory } from './experience-category.model';
import { Technology } from './technology.model';

export interface Experience {
  id: number;
  title: string;
  organization: Organization;
  status: ExperienceStatus;
  category: ExperienceCategory;
  description: string | null;
  startDate: string;
  endDate: string | null;
  technologies: Technology[];
}
