import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';

export const alt = 'About Amir Ardalan';
export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: 'About — Amir Ardalan',
    description:
      'About Amir Ardalan, a design engineer working across interaction design and frontend engineering.',
  });
}
