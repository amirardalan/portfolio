import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export interface OgImageProps {
  title: string;
  description: string;
  eyebrow?: string;
  category?: string;
}

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const colors = {
  background: '#09090b',
  border: '#2b2b30',
  accent: '#cbcc3b',
  accentInk: '#11130a',
  foreground: '#f4f4f5',
  muted: '#a1a1aa',
};

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

export async function generateOgImage({
  title,
  description,
  eyebrow = 'Portfolio',
  category,
}: OgImageProps) {
  const [editorialFont, sansFont, monoFont] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/instrument-sans-regular.ttf')),
    readFile(join(process.cwd(), 'public/fonts/jura-v31-latin-regular.ttf')),
    readFile(join(process.cwd(), 'public/fonts/jetbrains-mono-regular.ttf')),
  ]);

  const context = category ? `${eyebrow} / ${category}` : eyebrow;
  const displayContext = truncate(context, 32);
  const displayTitle = truncate(title, 100);
  const displayDescription = truncate(description, 170);
  const titleSize =
    displayTitle.length > 78 ? 58 : displayTitle.length > 52 ? 66 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: colors.background,
          color: colors.foreground,
          fontFamily: 'Instrument Sans',
        }}
      >
        <div
          style={{
            width: 1088,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '0 56px 0 64px',
          }}
        >
          <div
            style={{
              height: 128,
              display: 'flex',
              alignItems: 'center',
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: colors.accent,
                fontFamily: 'Jura',
                fontSize: 17,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 12 12"
                fill="none"
              >
                <circle
                  cx="6"
                  cy="6"
                  r="4.5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle cx="6" cy="6" r="0.75" fill="currentColor" />
              </svg>
              <span style={{ marginLeft: 12 }}>Amir Ardalan</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '26px 0 24px',
            }}
          >
            <h1
              style={{
                maxWidth: 900,
                margin: 0,
                color: colors.foreground,
                fontFamily: 'Instrument Sans',
                fontSize: titleSize,
                fontWeight: 400,
                letterSpacing: '-0.045em',
                lineHeight: 0.98,
                whiteSpace: 'pre-wrap',
              }}
            >
              {displayTitle}
            </h1>

            <p
              style={{
                maxWidth: 850,
                margin: '24px 0 0',
                color: colors.muted,
                fontFamily: 'Instrument Sans',
                fontSize: 27,
                fontWeight: 400,
                letterSpacing: '-0.015em',
                lineHeight: 1.25,
                whiteSpace: 'pre-wrap',
              }}
            >
              {displayDescription}
            </p>
          </div>

          <div
            style={{
              height: 128,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: `1px solid ${colors.border}`,
            }}
          >
            <span
              style={{
                color: colors.foreground,
                fontFamily: 'JetBrains Mono',
                fontSize: 16,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              https://amir.sh
            </span>
            <span
              style={{
                color: colors.muted,
                fontFamily: 'Jura',
                fontSize: 18,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Product • Interaction • Frontend
            </span>
          </div>
        </div>

        <div
          style={{
            width: 112,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.accent,
            color: colors.accentInk,
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid rgba(17, 19, 10, 0.28)',
            }}
          >
            <span
              style={{
                color: colors.accentInk,
                fontFamily: 'JetBrains Mono',
                fontSize: 18,
                flexShrink: 0,
                letterSpacing: '0.16em',
                opacity: 0.72,
                textTransform: 'uppercase',
                transform: 'rotate(-90deg)',
                whiteSpace: 'nowrap',
              }}
            >
              {displayContext}
            </span>
          </div>

          <div
            style={{
              height: 128,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              aria-hidden="true"
              width="52"
              height="52"
              viewBox="0 0 286 286"
              fill="currentColor"
            >
              <path d="M211.825 42.6501L220.907 49.9753C245.665 69.9432 252.057 88.6088 240.081 105.972C236.179 111.724 230.662 117.475 223.531 123.227L130.284 198.432L74.4767 153.423L211.825 42.6501ZM93.2473 18.1514C108.116 6.15986 122.412 0.109808 136.137 0.00128681C151.207 -0.107234 167.186 6.64821 184.072 20.2676L193.155 27.5928L55.8071 138.366L0 93.3566L93.2473 18.1514Z" />
              <path d="M92.845 258.487L101.928 265.813C126.686 285.781 149.829 290.935 171.358 281.277C178.49 278.13 185.621 273.68 192.753 267.929L286 192.724L230.193 147.715L92.845 258.487ZM62.469 162.853C47.6006 174.845 40.0991 186.375 39.9645 197.444C39.8299 209.599 48.2061 222.486 65.0928 236.105L74.1753 243.43L211.523 132.657L155.716 87.6481L62.469 162.853Z" />
            </svg>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 24,
            right: 112,
            bottom: 24,
            left: 24,
            border: `1px solid ${colors.border}`,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Instrument Sans',
          data: editorialFont,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Jura',
          data: sansFont,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'JetBrains Mono',
          data: monoFont,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
