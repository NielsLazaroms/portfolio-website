export type ProjectKind = 'Personal' | 'Others' | 'School';

export interface ProjectInfo {
  id: string;
  name: string;
  year: number;
  kind: ProjectKind;
  /** Which device frame the screenshots are shown in. */
  frame: 'browser' | 'phone';
  description: string;
  skills: string[];
  images: string[];
  url?: string;
  /** Short address shown in the browser frame. */
  urlLabel?: string;
  githubLink?: string;
  /** Shown instead of a link, for example when the code is private. */
  note?: string;
  isNew?: boolean;
}

/** 1 = every day, 2 = comfortable, 3 = used a few times */
export type SkillRing = 1 | 2 | 3;

export interface Skill {
  name: string;
  ring: SkillRing;
  /** Brand colour of the tool, used for its ring and the centre circle. */
  brand: string;
  /** Logo in assets; when missing, `mono` is shown as a monogram. */
  image?: string;
  mono?: string;
  /** One line about what I do with it. */
  description: string;
  /** Used in every project, so it is not linked to individual projects. */
  everywhere?: boolean;
}

export interface RouteStep {
  year: string;
  title: string;
  description: string;
  /** Relative height on the route line, 0 to 600. */
  height: number;
  isNow?: boolean;
}
