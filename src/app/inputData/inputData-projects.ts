import {ProjectInfo} from '../interfaces/interface';

export const projects: ProjectInfo[] = [
  {
    name: 'Miyamoto Experience',
    description: 'Project description',
    skills: ['Angular','SCSS', 'GSAP'],
    images: ['assets/miyamoto-1.jpg', "assets/miyamoto-2.jpg"],
    year: 2024,
    isExpanded: false,
  },
  {
    name: 'LedenCentraal',
    description: 'Project description2',
    skills: ['Angular', 'Tailwind', 'SQL', 'DaisyUI'],
    images: ['assets/ledencentraal-1.jpg', "assets/ledencentraal-2.jpg"],
    year: 2025,
    isExpanded: false
  },
  {
    name: 'Dog-life experience',
    description: 'Project description2',
    skills: ['Angular', 'SCSS', 'PWA', 'Firebase'],
    images: ['assets/dog-life-1.jpg', "assets/dog-life-2.jpg", "assets/dog-life-3.jpg", "assets/dog-life-4.jpg"],
    year: 2025,
    isExpanded: false
  },
  {
    name: 'Equine Integration widget',
    description: 'Project description2',
    skills: ['Kotlin'],
    year: 2025,
    isExpanded: false
  },
  {
    name: 'Summer Rush',
    description: 'Project description2',
    skills: ['JavaScript', 'Illustrator'],
    images: ['assets/summer-rush-1.jpg', "assets/summer-rush-2.jpg", "assets/summer-rush-3.jpg", "assets/summer-rush-4.jpg"],

    year: 2024,
    isExpanded: false
  },
]
