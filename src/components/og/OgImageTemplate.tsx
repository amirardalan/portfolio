import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export interface OgImageProps {
  title: string;
  description: string;
  category?: string;
}

// Size
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export async function generateOgImage({
  title,
  description,
  category,
}: OgImageProps) {
  const fontData = await readFile(
    join(process.cwd(), 'public/fonts/jura-v31-latin-regular.ttf')
  );

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full"
        style={{
          background:
            'linear-gradient(125deg, #18181b 0%, #18181b 58%, #1d171e 78%, #251328 100%)',
          backgroundSize: '100% 100%',
        }}
      >
        <div tw="flex flex-col w-full h-full p-20 relative justify-between">
          <div tw="flex w-full items-center justify-between">
            <div tw="flex items-center">
              <svg
                aria-hidden="true"
                width="28"
                height="28"
                viewBox="0 0 12 12"
                fill="none"
              >
                <circle
                  cx="6"
                  cy="6"
                  r="4.5"
                  stroke="#cbcc3b"
                  strokeWidth="1"
                />
                <circle cx="6" cy="6" r="0.75" fill="#cbcc3b" />
              </svg>
              <span tw="ml-3 text-3xl text-[#cbcc3b]">amir.sh</span>
            </div>
            {category && <span tw="text-3xl text-[#a1a1aa]">#{category}</span>}
          </div>

          <div tw="flex flex-col mt-12">
            <h2 tw="text-7xl text-[#e4e4e7] text-left font-medium mt-4 w-full leading-none">
              {title}
            </h2>
            <h3 tw="w-full mt-5 text-4xl text-[#a1a1aa] leading-tight">
              {description}
            </h3>
          </div>

          <div tw="flex items-center justify-end">
            <svg
              width={100}
              height={100}
              viewBox="0 0 286 286"
              xmlns="http://www.w3.org/2000/svg"
              fill="#cbcc3b"
            >
              <path d="M211.825 42.6501L220.907 49.9753C245.665 69.9432 252.057 88.6088 240.081 105.972C236.179 111.724 230.662 117.475 223.531 123.227L130.284 198.432L74.4767 153.423L211.825 42.6501ZM93.2473 18.1514C108.116 6.15986 122.412 0.109808 136.137 0.00128681C151.207 -0.107234 167.186 6.64821 184.072 20.2676L193.155 27.5928L55.8071 138.366L0 93.3566L93.2473 18.1514Z" />
              <path d="M92.845 258.487L101.928 265.813C126.686 285.781 149.829 290.935 171.358 281.277C178.49 278.13 185.621 273.68 192.753 267.929L286 192.724L230.193 147.715L92.845 258.487ZM62.469 162.853C47.6006 174.845 40.0991 186.375 39.9645 197.444C39.8299 209.599 48.2061 222.486 65.0928 236.105L74.1753 243.43L211.523 132.657L155.716 87.6481L62.469 162.853Z" />
            </svg>
          </div>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
      fonts: [
        {
          name: 'Jura',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
