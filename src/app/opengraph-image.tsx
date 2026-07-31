import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';

export const alt = 'Amir Ardalan';
export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: 'Complex ideas.\nClear, working interfaces.',
    description:
      'I bridge product design and frontend engineering,\nfrom early prototype to production.',
    eyebrow: 'Portfolio / Design engineer',
  });
}
