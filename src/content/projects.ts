export type ProjectMedia = {
  src: string;
  alt: string;
};

export type Project = {
  title: string;
  summary: string;
  year?: string;
  role?: string[];
  collaborators?: string[];
  status?: string;
  liveUrl?: string;
  sourceUrl?: string;
  caseStudyUrl?: string;
  media?: ProjectMedia[];
  technologies?: string[];
  contribution?: string;
  constraints?: string[];
  decisions?: string[];
  outcomes?: string[];
};

export const selectedProjects: Project[] = [
  {
    title: 'manifold.observer',
    summary:
      'An audiovisual experiment that gives information another shape. Add a source, change the conditions, and watch a responsive form reorganize in real time.',
    year: '2026',
    role: ['Product design', 'Interaction design', 'Frontend engineering'],
    status: 'Live project',
    liveUrl: 'https://manifold.observer',
    caseStudyUrl: '/blog/manifold-observer',
    media: [
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
];
