import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';

export const alt = 'Amir Ardalan';
export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: 'Amir Ardalan — Design Engineer',
    description:
      'I design and build thoughtful software, from early exploration through interaction design to production code.',
  });
}
