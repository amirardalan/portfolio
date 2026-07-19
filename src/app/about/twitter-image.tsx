import { generateTwitterImage } from '@/components/og/TwitterImageTemplate';
import { size, contentType } from '@/components/og/OgImageTemplate';

export const alt = 'About Amir Ardalan';
export { size, contentType };

export default async function Image() {
  return generateTwitterImage({
    title: 'About — Amir Ardalan',
    description:
      'Design Engineer with 10+ years of experience creating innovative digital solutions.',
  });
}
