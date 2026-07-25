export type ProjectHero = {
  src: string;
  alt: string;
  treatment: 'between' | 'manifold';
  position?: string;
};

export type Project = {
  title: string;
  summary: string;
  year: string;
  role: string[];
  status: string;
  liveUrl: string;
  caseStudyUrl?: string;
  hero: ProjectHero;
};

export const selectedProjects: Project[] = [
  {
    title: 'between',
    summary:
      'Catch a thought, image, sound, drawing, or place before it disappears. Arrange fragments into fields and notice what forms between them.',
    year: '2026',
    role: ['Product design', 'Interaction design', 'Frontend engineering'],
    status: 'Independent project',
    liveUrl: 'https://between.cards/',
    hero: {
      src: '/work/between/between-featured.webp',
      alt: 'A dark between example Field with image, audio, location, quote, and drawing fragments connected across the canvas.',
      treatment: 'between',
    },
  },
  {
    title: 'manifold.observer',
    summary:
      'An audiovisual experiment that gives information another shape. Add a source, change the conditions, and watch a responsive form reorganize in real time.',
    year: '2026',
    role: ['Product design', 'Interaction design', 'Frontend engineering'],
    status: 'Independent project',
    liveUrl: 'https://manifold.observer',
    caseStudyUrl: '/blog/manifold-observer',
    hero: {
      src: '/work/manifold-composite.webp',
      alt: 'Six vertical slices combine cyan, magenta, teal, amber, violet, and lime generative forms from manifold.observer.',
      treatment: 'manifold',
    },
  },
];
