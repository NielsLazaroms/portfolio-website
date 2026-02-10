import {ProjectInfo} from '../interfaces/interface';

export const projects: ProjectInfo[] = [
  {
    name: 'Miyamoto Experience',
    description: 'Developed an interactive experience to learn people more about Miyamoyto. The animations used within this experience are mainly made by the use of GSAP. ',
    skills: ['Angular','SCSS', 'GSAP'],
    images: ['assets/miyamoto-1.jpg', "assets/miyamoto-2.jpg"],
    year: 2024,
    url: 'https://miyamoto-experience.netlify.app/',
    githubLink: 'https://github.com/NielsLazaroms/miyamoto-experience',
    isExpanded: false,
  },
  {
    name: 'LedenCentraal',
    description: 'Developed a panel where shooting associations, are able to keep track of their scores, members, events and much more.',
    skills: ['Angular', 'Tailwind', 'SQL', 'DaisyUI'],
    images: ['assets/ledencentraal-1.jpg', "assets/ledencentraal-2.jpg"],
    year: 2025,
    url: 'https://www.ledencentraal.nl/',
    isExpanded: false
  },
  {
    name: 'Dog-life experience',
    description: 'Developed the virtual part of a boardgame, which is used to make people more aware of the responsibilities of having a dog. To store all the data whilst playing the game I decided to use FireStore.',
    skills: ['Angular', 'SCSS', 'PWA', 'Firebase'],
    images: ['assets/dog-life-1.jpg', "assets/dog-life-2.jpg", "assets/dog-life-3.jpg", "assets/dog-life-4.jpg"],
    year: 2025,
    url: 'https://dogdxd.netlify.app/',
    githubLink: 'https://github.com/NielsLazaroms/dogGameProject',
    isExpanded: false
  },
  {
    name: 'Equine Integration widget',
    description: 'Developed an Android widget that is linked to an app made in Flutter. This app keeps track of the wellbeing of horses.',
    skills: ['Kotlin'],
    year: 2025,
    githubLink: 'https://github.com/NielsLazaroms/equine_integration_feedback_group_project',
    isExpanded: false
  },
  {
    name: 'Summer Rush',
    description: 'Developed a fun game, where people could gather points which they can spend in a shop. The game itself is a 2d Subway Surfers.',
    skills: ['JavaScript', 'Illustrator'],
    images: ['assets/summer-rush-1.jpg', "assets/summer-rush-2.jpg", "assets/summer-rush-3.jpg", "assets/summer-rush-4.jpg"],
    url: 'https://summer-rush-demo.netlify.app/',
    githubLink: 'https://github.com/NielsLazaroms/summer-rush',
    year: 2024,
    isExpanded: false
  },
  {
    name: 'Slope works',
    description: 'Slopeworks helps skiers plan and book well-organized ski trips to the world’s best mountain destinations.',
    skills: ['Typescript', 'Angular', 'Tailwind', 'MnLib'],
    images: ['assets/slopeworks_1.png', "assets/slopeworks_2.png"],
    url: 'https://www.slopeworks.nl/',
    githubLink: 'https://github.com/NielsLazaroms/SlopeWorks',
    year: 2026,
    isExpanded: false
  },
  {
    name: 'MnLib',
    description: 'mnlib is a reusable component library built to create consistent, accessible, and scalable user interfaces.',
    skills: ['Typescript', 'Angular', 'Tailwind'],
    githubLink: 'https://github.com/Mxndarijn/MnLib',
    year: 2026,
    isExpanded: false
  },
  {
    name: 'Gym with Ai',
    description: 'Gym with AI analyzes your form in real time and gives smart feedback to help you train better and safer.',
    skills: ['Typescript', 'Angular', 'SCSS', 'Python'],
    images: ['assets/gym_1.png', "assets/gym_2.png", "assets/gym_3.png"],
    githubLink: 'https://github.com/NielsLazaroms/PoseDetection',
    year: 2026,
    isExpanded: false
  },
]
