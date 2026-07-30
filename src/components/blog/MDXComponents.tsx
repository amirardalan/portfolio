import { ComponentPropsWithoutRef } from 'react';
import { highlight } from 'sugar-high';
import Link from 'next/link';
import Image from 'next/image';
import { generateSlug } from '@/utils/generate-slug';
import CopyButton from '@/components/icons/IconCopy';
import Note from '@/components/blog/Note';
import ProjectCTA from '@/components/blog/ProjectCTA';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

export const components = {
  h1: (props: HeadingProps) => (
    <h2
      className="font-editorial text-dark mb-5 pt-12 text-3xl leading-tight font-medium tracking-tight text-balance dark:text-light md:text-4xl"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="font-editorial text-dark mt-12 mb-5 text-3xl leading-tight font-medium tracking-tight text-balance dark:text-light md:text-4xl"
      {...props}
    />
  ),
  h3: ({ children, ...props }: HeadingProps) => {
    if (typeof children !== 'string' && !Array.isArray(children)) {
      return (
        <h3
          className="font-editorial text-dark mt-10 mb-4 text-2xl leading-tight font-medium tracking-tight dark:text-light md:text-3xl"
          {...props}
        >
          {children}
        </h3>
      );
    }
    const slug = generateSlug(
      Array.isArray(children)
        ? children
            .map((child) => (typeof child === 'string' ? child : ''))
            .join('')
        : children
    );
    return (
      <h3
        id={slug}
        className="font-editorial text-dark mt-10 mb-4 scroll-mt-24 text-2xl leading-tight font-medium tracking-tight dark:text-light md:text-3xl"
        {...props}
      >
        <a href={`#${slug}`} className="group relative">
          <span
            className="text-primary absolute -left-5 font-mono opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            aria-hidden="true"
          >
            #
          </span>
          {Array.isArray(children)
            ? children.map((child, index) =>
                typeof child === 'string' ? (
                  child
                ) : (
                  <code
                    key={index}
                    className="font-mono before:content-['`'] after:content-['`']"
                  >
                    {child.props.children}
                  </code>
                )
              )
            : children}
        </a>
      </h3>
    );
  },
  h4: (props: HeadingProps) => (
    <h4
      className="font-editorial text-dark mt-8 mb-3 text-xl leading-tight font-semibold tracking-tight dark:text-light md:text-2xl"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="font-editorial my-5 text-lg leading-8 font-normal text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="font-editorial text-dark my-6 list-decimal space-y-3 pl-6 text-lg leading-8 marker:font-mono marker:text-primary dark:text-light"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="font-editorial text-dark my-6 list-disc space-y-3 pl-6 text-lg leading-8 marker:text-primary dark:text-light"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-2" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="text-dark italic dark:text-light" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="text-dark font-semibold dark:text-light" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary focus-visible:decoration-primary';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const isInsidePre = props.className?.includes('language-');
    if (!isInsidePre) {
      return (
        <code
          className="border-primary/20 bg-primary/10 text-primary rounded-sm border px-1.5 py-0.5 font-mono text-[0.9em] font-normal"
          {...props}
        >
          {children}
        </code>
      );
    }

    const className = props.className || '';
    const match = className.match(/language-([^{\s]+)(?:\s*{(.+)})?/);
    const highlightLines = match?.[2] || '';

    // Parse the highlight line numbers
    const linesToHighlight = new Set<number>();
    if (highlightLines) {
      highlightLines.split(',').forEach((range) => {
        const trimmedRange = range.trim();
        if (trimmedRange.includes('-')) {
          const [start, end] = trimmedRange.split('-').map(Number);
          for (let i = start; i <= end; i++) {
            linesToHighlight.add(i);
          }
        } else {
          linesToHighlight.add(Number(trimmedRange));
        }
      });
    }

    let codeHTML = highlight(children as string);

    if (linesToHighlight.size > 0) {
      const lines = codeHTML.split('\n');
      codeHTML = lines
        .map((line, i) => {
          const lineNumber = i + 1;
          const shouldHighlight = linesToHighlight.has(lineNumber);
          return shouldHighlight
            ? `<div class="highlight-line">${line}</div>`
            : `<div>${line}</div>`;
        })
        .join('');
    }

    return (
      <code
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        className="text-dark bg-zinc-200 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-800 dark:text-light"
        {...props}
      />
    );
  },
  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
    let codeText: string | null = null;
    let language: string | null = null;

    // Get the code for copying to clipboard and extract language
    if (children && typeof children === 'object' && 'props' in children) {
      const childrenObj = children as { props: Record<string, unknown> };
      if (childrenObj.props && typeof childrenObj.props.children === 'string') {
        codeText = childrenObj.props.children;
      }

      // Extract language from className
      if (childrenObj.props.className) {
        const match = (childrenObj.props.className as string).match(
          /language-([^{\s]+)/
        );
        if (match && match[1]) {
          language = match[1];
        }
      }
    }

    return (
      <div className="group relative">
        <pre
          className="line-highlight-enabled scrollbar my-8 overflow-x-auto overflow-y-hidden rounded-md border border-zinc-200 bg-zinc-100 p-5 font-mono text-sm dark:border-zinc-800 dark:bg-zinc-900"
          {...props}
        >
          {children}
        </pre>
        {codeText && (
          <CopyButton
            text={codeText}
            className="md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100"
          />
        )}
        {language && (
          <span className="text-xxs absolute right-2 bottom-2 bg-zinc-100 px-1.5 py-0.5 font-mono tracking-wider text-zinc-500 uppercase dark:bg-zinc-900 dark:text-zinc-400">
            {language}
          </span>
        )}
      </div>
    );
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table className="font-editorial my-8 w-full border-collapse text-left text-base">
      <thead className="border-b border-zinc-400 dark:border-zinc-600">
        <tr>
          {data.headers.map((header, index) => (
            <th
              key={index}
              className="text-xxs px-3 py-3 font-sans tracking-[0.14em] uppercase first:pl-0 last:pr-0"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr
            key={index}
            className="border-b border-zinc-200 dark:border-zinc-800"
          >
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="px-3 py-3 first:pl-0 last:pr-0"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="font-editorial text-dark my-10 border-l border-primary pl-6 text-2xl leading-snug font-medium tracking-tight dark:text-light md:text-3xl"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<'img'> & { title?: string }) => {
    const { src, alt, title } = props;
    const isPriority = title?.trim().toLowerCase() === 'priority';

    if (typeof src !== 'string') {
      return null;
    }

    return (
      <Image
        src={src}
        alt={alt ?? ''}
        width={736}
        height={552}
        priority={isPriority}
        className="my-6 h-auto w-full"
      />
    );
  },
  Figure: ({
    src,
    alt,
    caption,
    priority = false,
    aspect = 'natural',
    position = 'center',
  }: {
    src: string;
    alt?: string;
    caption?: string;
    priority?: boolean;
    aspect?: 'natural' | 'wide';
    position?: string;
  }) => (
    <figure className="my-6">
      {aspect === 'wide' ? (
        <div className="relative aspect-video w-full overflow-clip">
          <Image
            src={src}
            alt={alt ?? ''}
            fill
            priority={priority}
            sizes="(min-width: 736px) 672px, calc(100vw - 48px)"
            className="object-cover"
            style={{ objectPosition: position }}
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt ?? ''}
          width={736}
          height={552}
          priority={priority}
          className="h-auto w-full"
        />
      )}
      {caption && (
        <figcaption className="text-xxs mt-3 text-right font-sans tracking-[0.14em] text-zinc-500 uppercase dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  ),
  Note,
  ProjectCTA,
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
