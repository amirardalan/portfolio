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
    <h2 className="mb-0 pt-10 text-dark dark:text-light" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mb-3 mt-7 text-dark dark:text-light" {...props} />
  ),
  h3: ({ children, ...props }: HeadingProps) => {
    if (typeof children !== 'string' && !Array.isArray(children)) {
      return (
        <h3
          className="mb-3 mt-7 text-2xl font-medium text-dark dark:text-light"
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
        className="mb-3 mt-7 scroll-mt-24 text-2xl font-medium leading-tight text-dark lg:leading-normal dark:text-light"
        {...props}
      >
        <a href={`#${slug}`} className="group relative">
          <span
            className="absolute -left-5 text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
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
                    className="font-sans before:content-['`'] after:content-['`']"
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
  h4: (props: HeadingProps) => <h4 className="" {...props} />,
  p: (props: ParagraphProps) => (
    <p
      className="my-5 font-serif text-lg font-normal leading-relaxed"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal space-y-2 pl-5 text-dark dark:text-light"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="my-6 list-disc space-y-1 pl-5 text-dark dark:text-light"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="text-dark dark:text-light" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="text-dark dark:text-light" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-zinc-600 underline decoration-zinc-400/60 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary focus-visible:text-primary focus-visible:decoration-primary dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-primary dark:hover:decoration-primary dark:focus-visible:text-primary dark:focus-visible:decoration-primary';
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
          className="rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-[0.9em] font-normal text-primary ring-1 ring-inset ring-primary/20"
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
        className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm text-dark dark:bg-zinc-800 dark:text-light"
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
          className="overflow-y-none line-highlight-enabled my-6 overflow-x-auto rounded-lg bg-zinc-100 p-5 font-mono text-sm scrollbar scrollbar-track-zinc-600 scrollbar-thumb-zinc-500 dark:bg-zinc-900"
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
          <span className="absolute bottom-2 right-2 rounded px-1.5 py-0.5 text-xxs text-zinc-500 dark:text-zinc-400">
            {language}
          </span>
        )}
      </div>
    );
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="my-6 ml-[0.075em] border-l-4 border-zinc-300 pl-4 font-serif text-3xl text-zinc-400 dark:border-zinc-600 dark:text-zinc-500"
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
        <figcaption className="mt-2 text-right text-xxs uppercase text-gray-600 dark:text-gray-400">
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
