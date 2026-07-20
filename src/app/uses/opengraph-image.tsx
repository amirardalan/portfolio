import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';

export const alt = 'Amir Ardalan Uses';
export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: 'Uses — Amir Ardalan',
    description: 'Hardware, software, and tools I use.',
  });
}
