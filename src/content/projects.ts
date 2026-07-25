export type ProjectMedia = {
  src: string;
  alt: string;
};

export type ProjectVisual =
  | {
      treatment: 'between';
      src: string;
      alt: string;
      position?: string;
    }
  | {
      treatment: 'manifold';
      images: ProjectMedia[];
    };

export type Project = {
  title: string;
  summary: string;
  year: string;
  role: string[];
  status: string;
  liveUrl: string;
  caseStudyUrl?: string;
  visual: ProjectVisual;
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
    caseStudyUrl: '/blog/between',
    visual: {
      src: 'https://res.cloudinary.com/amir-ardalan/image/upload/v1784955346/Work/between-hero_nniw2n.png',
      alt: 'An ivory between field with connected cards containing photographs, notes, audio waveforms, drawings, and locations.',
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
    visual: {
      treatment: 'manifold',
      images: [
        {
          src: 'Work/manifold-orbital-MNF-09YPON9O_4_uwdfqu',
          alt: 'A luminous orbital form in manifold.observer.',
        },
        {
          src: 'Work/manifold-mandala-MNF-9LQOWU_2_ggmbwv',
          alt: 'A luminous mandala form in manifold.observer.',
        },
        {
          src: 'Work/manifold-wormhole-MNF-0NU0MXZC_q5wpta',
          alt: 'A luminous wormhole form in manifold.observer.',
        },
        {
          src: 'Work/manifold-helix-MNF-0EL5C2U8_fmka99',
          alt: 'A luminous helix form in manifold.observer.',
        },
        {
          src: 'Work/manifold-observer-3_lvy9qm',
          alt: 'An amorphous form in the manifold.observer interface.',
        },
        {
          src: 'Work/manifold-terrain-MNF-03RSVFL5_fizyhn.png',
          alt: 'A luminous terrain form in manifold.observer.',
        },
      ],
    },
  },
];
