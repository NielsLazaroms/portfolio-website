export interface ProjectInfo {
  name: string;
  description: string;
  skills: string[];
  year: number;
  githubLink?: string;
  url?: string;
  images?: string[];
  isExpanded?: boolean;
}
export interface Skill {
  image: string;
  name: string;
  quote: string;
  yearsExperience: number;
  projectsMade: number,
  maxProjects: number,
  maxExperience: number;
  hoursPracticed: number;
  maxHoursPracticed: number;
}

export interface Image {
  image: string;
  description: string;

}
