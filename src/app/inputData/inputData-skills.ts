import {Skill, SkillRing} from '../interfaces/interface';

export const skillRingLabels: Record<SkillRing, string> = {
  1: 'Every day',
  2: 'Comfortable',
  3: 'Used a few times',
};

export const skills: Skill[] = [
  // Inner ring: every day
  {name: 'TypeScript', ring: 1, brand: '#3178C6', image: 'assets/typescript-icon.svg', description: 'Typed front ends and back ends; strict mode on every new project.'},
  {name: 'Angular', ring: 1, brand: '#DD0031', image: 'assets/angular-icon.svg', description: 'Standalone components and signals; built my own component library on it.'},
  {name: 'Tailwind', ring: 1, brand: '#38BDF8', image: 'assets/tailwind-icon.svg', description: 'Utility classes for quick, consistent layouts, often with DaisyUI.'},
  {name: 'Git', ring: 1, brand: '#F05032', image: 'assets/git.svg', everywhere: true, description: 'Branches, pull requests and reviews, at work and at home.'},
  // Every project runs on Node tooling (npm, Angular CLI, Vite), so it is not tied to single projects.
  {name: 'Node.js', ring: 1, brand: '#5FA04E', image: 'assets/nodejs-icon.svg', everywhere: true, description: 'Build tools, scripts and small servers behind my projects.'},
  // Middle ring: comfortable
  {name: 'JavaScript', ring: 2, brand: '#D9B800', image: 'assets/javascript-icon.svg', description: 'Plain JS for school projects and quick prototypes.'},
  {name: 'Vue', ring: 2, brand: '#42B883', image: 'assets/vue-icon.svg', description: 'Front ends at work, with the composition API.'},
  {name: 'SCSS', ring: 2, brand: '#CD6799', image: 'assets/css-icon.svg', description: 'Theming with variables and mixins, like the light and dark mode on this site.'},
  {name: 'GSAP', ring: 2, brand: '#88CE02', image: 'assets/gsap-icon.svg', description: 'Scroll and intro animations.'},
  {name: 'NestJS', ring: 2, brand: '#E0234E', image: 'assets/nestjs-icon.svg', description: 'REST APIs with modules, guards and a SQL database.'},
  {name: 'SQL', ring: 2, brand: '#4479A1', image: 'assets/sql-icon.svg', description: 'Designing tables and writing queries for my own apps.'},
  // Outer ring: used a few times
  {name: 'AngularJS', ring: 3, brand: '#B52E31', image: 'assets/angularjs-icon.svg', description: 'Maintaining older code at work.'},
  {name: 'GraphQL', ring: 3, brand: '#E10098', image: 'assets/graphql-icon.svg', description: 'Querying APIs at work.'},
  {name: 'Firebase', ring: 3, brand: '#FFA000', image: 'assets/firebase-icon.svg', description: 'Auth, Firestore and hosting for small apps.'},
  {name: 'Illustrator', ring: 3, brand: '#FF9A00', image: 'assets/illustrator-icon.svg', description: 'Logos, icons and game art.'},
  {name: 'Python', ring: 3, brand: '#3776AB', image: 'assets/python-icon.svg', description: 'Pose detection for the Gym with AI app.'},
];
