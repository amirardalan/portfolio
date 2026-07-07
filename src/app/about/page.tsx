'use client';

import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import Tooltip from '@/components/ui/Tooltip';
import { CldImage } from 'next-cloudinary';

export default function About() {
  return (
    <Container>
      <main className="mt-12" aria-labelledby="about-heading">
        <div id="about-heading">
          <PageHeading title={'About'} />
        </div>
        <section className="mb-4 max-w-7xl font-serif text-xl font-light italic leading-normal md:text-3xl md:leading-normal lg:mb-6 lg:text-4xl lg:leading-normal">
          <p className="mb-4 text-dark md:mb-6 lg:mb-8 dark:text-light">
            Frontend Engineer based in Portland, OR.
          </p>
          <p className="mb-4 text-dark md:mb-6 lg:mb-8 dark:text-light">
            I&apos;ve shaped digital solutions blending code and design for
            Nike&apos;s LeBron James Innovation Center, Columbia Sportswear, and
            KEEN Footwear with BASIC/DEPT®.
          </p>
          <p className="mb-4 text-dark dark:text-light">
            I craft intuitive, innovative products that elevate user experiences
            and drive results.
          </p>
        </section>

        <section
          className="mt-8 flex flex-col justify-between border-t-2 border-zinc-200 pt-8 lg:mt-16 lg:flex-row lg:pt-12 dark:border-zinc-800"
          aria-label="Contact links"
        >
          <div className="flex flex-col justify-center">
            <p className="mb-4 font-serif text-zinc-500 dark:text-zinc-400">
              Want to work together? Get in touch:
            </p>
            <div className="mb-2 flex flex-row items-center">
              <p className="text-zinc-600 dark:text-zinc-500" id="x-link">
                X:
              </p>
              <Tooltip text="Follow me on X" pos="r">
                <a
                  href="https://x.com/amirardalan"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="ml-1 text-primary"
                  aria-labelledby="x-link"
                >
                  @amirardalan
                </a>
              </Tooltip>
            </div>
            <div className="mb-2 flex flex-row items-center">
              <p className="text-zinc-600 dark:text-zinc-500" id="github-link">
                GitHub:
              </p>
              <Tooltip text="Explore my GitHub" pos="r">
                <a
                  href="https://github.com/amirardalan"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="ml-1 text-primary"
                  aria-labelledby="github-link"
                >
                  @amirardalan
                </a>
              </Tooltip>
            </div>
            <div className="mb-2 flex flex-row items-center">
              <p
                className="text-zinc-600 dark:text-zinc-500"
                id="linkedin-link"
              >
                LinkedIn:
              </p>
              <Tooltip text="Connect on LinkedIn" pos="r">
                <a
                  href="https://linkedin.com/in/amirardalan"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="ml-1 text-primary"
                  aria-labelledby="linkedin-link"
                >
                  /in/amirardalan
                </a>
              </Tooltip>
            </div>
            <div className="mb-2 flex flex-row items-center">
              <p className="text-zinc-600 dark:text-zinc-500" id="resume-link">
                Resume:
              </p>
              <Tooltip text="Download my resume" pos="r">
                <a
                  href="/resume"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="ml-1 text-primary"
                  aria-labelledby="resume-link"
                >
                  download
                </a>
              </Tooltip>
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
}
