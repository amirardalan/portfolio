import { generateTwitterImage } from '@/components/og/TwitterImageTemplate';
import { size, contentType } from '@/components/og/OgImageTemplate';

export const alt = 'Amir Ardalan';
export { size, contentType };

export default async function Image() {
  return generateTwitterImage({
    title: 'Amir Ardalan — Design Engineer',
    description:
      'I design and build thoughtful software, from early exploration through interaction design to production code.',
  });
}
