import { generateSlug } from '@/utils/generate-slug';
import ResponsiveTextarea from '@/components/blog/ResponsiveTextarea';
import { Category, PinnedPostSummary } from '@/types/blog';

interface PostFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  slug: string;
  setSlug: (value: string) => void;
  excerpt: string;
  setExcerpt: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  published: boolean;
  setPublished: (value: boolean) => void;
  featured?: boolean;
  setFeatured?: (value: boolean) => void;
  showGallery: boolean;
  setShowGallery: (value: boolean) => void;
  showUpdated?: boolean;
  setShowUpdated?: (value: boolean) => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  onTextAreaSelect?: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  categories: Category[];
  categoryId: number | null;
  setCategoryId: (value: number | null) => void;
  categoriesLoading?: boolean;
  pinnedPost?: PinnedPostSummary | null;
  currentPostId?: number;
}

export default function PostFormFields({
  title,
  setTitle,
  slug,
  setSlug,
  excerpt,
  setExcerpt,
  content,
  setContent,
  published,
  setPublished,
  featured,
  setFeatured,
  setShowGallery,
  showUpdated,
  setShowUpdated,
  textareaRef,
  onTextAreaSelect,
  categories = [],
  categoryId,
  setCategoryId,
  categoriesLoading = false,
  pinnedPost = null,
  currentPostId,
}: PostFormFieldsProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const pinnedPostIsCurrent = Boolean(
    pinnedPost && pinnedPost.id === currentPostId
  );
  const pinDescription = !published
    ? 'Publish this post before pinning it.'
    : featured && pinnedPost && !pinnedPostIsCurrent
      ? `This will replace “${pinnedPost.title}” as the pinned post.`
      : featured && pinnedPostIsCurrent
        ? 'Currently pinned to the top of Writing.'
        : featured
          ? 'This will be pinned to the top of Writing.'
          : 'Keep this at the top of Writing. Only one post can be pinned.';

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="bg-light dark:bg-dark overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
        <div className="group border-b border-zinc-200 p-6 transition-colors focus-within:bg-zinc-50/70 md:p-8 dark:border-zinc-800 dark:focus-within:bg-zinc-900/40">
          <label
            htmlFor="title"
            className="text-xxs group-focus-within:text-primary dark:group-focus-within:text-primary mb-3 block font-sans tracking-[0.16em] text-zinc-500 uppercase transition-colors dark:text-zinc-400"
          >
            Post title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Give the post a clear title"
            value={title}
            onChange={handleTitleChange}
            required
            className="cms-editor-field text-dark dark:text-light block w-full bg-transparent font-sans text-3xl leading-tight font-medium outline-none placeholder:text-zinc-300 md:text-4xl dark:placeholder:text-zinc-600"
          />
        </div>

        <div className="group border-b border-zinc-200 p-6 transition-colors focus-within:bg-zinc-50/70 md:p-8 dark:border-zinc-800 dark:focus-within:bg-zinc-900/40">
          <label
            htmlFor="excerpt"
            className="text-xxs group-focus-within:text-primary dark:group-focus-within:text-primary mb-3 block font-sans tracking-[0.16em] text-zinc-500 uppercase transition-colors dark:text-zinc-400"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            placeholder="A concise introduction for post cards and metadata"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            rows={3}
            className="cms-editor-field text-dark dark:text-light block w-full resize-none bg-transparent font-sans text-base leading-relaxed font-normal outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
          />
        </div>

        <div className="group">
          <div className="flex items-start justify-between gap-5 border-b border-zinc-200 px-6 py-4 md:px-8 dark:border-zinc-800">
            <div>
              <label
                htmlFor="content"
                className="text-xxs group-focus-within:text-primary dark:group-focus-within:text-primary block font-sans tracking-[0.16em] text-zinc-500 uppercase transition-colors dark:text-zinc-400"
              >
                Story
              </label>
              <p className="mt-1 font-sans text-xs text-zinc-400 dark:text-zinc-600">
                Write with Markdown; images and embeds appear inline
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowGallery(true)}
              className="text-xxs text-dark hover:border-primary hover:text-primary dark:text-light inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-zinc-300 px-4 font-sans tracking-[0.1em] uppercase transition-colors dark:border-zinc-700"
            >
              Insert image <span aria-hidden="true">+</span>
            </button>
          </div>
          <div className="transition-colors focus-within:bg-zinc-50/70 dark:focus-within:bg-zinc-900/40">
            <ResponsiveTextarea
              id="content"
              placeholder="Start writing…"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
              required
              className="cms-editor-field text-dark dark:text-light block min-h-[32rem] w-full bg-transparent px-6 py-7 font-mono text-sm leading-7 font-normal outline-none placeholder:text-zinc-300 md:px-8 dark:placeholder:text-zinc-600"
              textareaRef={textareaRef}
              onSelect={onTextAreaSelect}
            />
          </div>
        </div>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-28">
        <section className="rounded-3xl border border-zinc-200 bg-zinc-100/60 p-6 font-sans dark:border-zinc-800 dark:bg-zinc-900/60">
          <h2 className="text-xxs tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
            Post details
          </h2>
          <div className="group mt-6">
            <label
              htmlFor="slug"
              className="group-focus-within:text-primary dark:group-focus-within:text-primary mb-2 block text-xs text-zinc-600 transition-colors dark:text-zinc-400"
            >
              URL slug
            </label>
            <input
              type="text"
              id="slug"
              placeholder="post-url-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="cms-editor-field bg-light text-dark focus:border-primary dark:bg-dark dark:text-light h-11 w-full rounded-xl border border-zinc-200 px-3 font-mono text-xs font-normal transition-colors outline-none dark:border-zinc-700"
            />
          </div>
          <div className="group mt-5">
            <label
              htmlFor="category"
              className="group-focus-within:text-primary dark:group-focus-within:text-primary mb-2 block text-xs text-zinc-600 transition-colors dark:text-zinc-400"
            >
              Category
            </label>
            <select
              id="category"
              value={categoryId ?? ''}
              onChange={(e) =>
                setCategoryId(e.target.value ? Number(e.target.value) : null)
              }
              disabled={categoriesLoading}
              className="cms-editor-field bg-light text-dark focus:border-primary dark:bg-dark dark:text-light h-11 w-full rounded-xl border border-zinc-200 px-3 text-xs transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-700"
            >
              <option value="">
                {categoriesLoading
                  ? 'Loading categories...'
                  : categories.length === 0
                    ? 'No categories available'
                    : 'Uncategorized'}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        <fieldset className="bg-light dark:bg-dark overflow-hidden rounded-3xl border border-zinc-200 font-sans dark:border-zinc-800">
          <legend className="sr-only">Publishing options</legend>
          <div className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
            <p className="text-xxs tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
              Publishing
            </p>
          </div>
          <div className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
            <p className="text-sm">Post status</p>
            <div
              className="mt-3 grid grid-cols-2 gap-1 rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-900"
              role="group"
              aria-label="Post status"
            >
              <button
                type="button"
                aria-pressed={!published}
                onClick={() => {
                  setPublished(false);
                  setFeatured?.(false);
                }}
                className={`text-xxs min-h-9 rounded-lg px-3 tracking-[0.1em] uppercase transition-colors ${
                  !published
                    ? 'bg-light text-dark dark:text-light shadow-sm dark:bg-zinc-700'
                    : 'hover:text-dark dark:hover:text-light text-zinc-500 dark:text-zinc-400'
                }`}
              >
                Draft
              </button>
              <button
                type="button"
                aria-pressed={published}
                onClick={() => setPublished(true)}
                className={`text-xxs min-h-9 rounded-lg px-3 tracking-[0.1em] uppercase transition-colors ${
                  published
                    ? 'bg-light text-dark dark:text-light shadow-sm dark:bg-zinc-700'
                    : 'hover:text-dark dark:hover:text-light text-zinc-500 dark:text-zinc-400'
                }`}
              >
                Published
              </button>
            </div>
            <p className="mt-2 text-xs leading-relaxed font-normal text-zinc-500 dark:text-zinc-400">
              Status changes are applied when you save.
            </p>
          </div>
          {setFeatured && (
            <label
              className={`flex items-start justify-between gap-4 px-6 py-5 ${
                setShowUpdated
                  ? 'border-b border-zinc-200 dark:border-zinc-800'
                  : ''
              } ${
                published ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              }`}
            >
              <span>
                <span className="block text-sm">Pin post</span>
                <span
                  aria-live="polite"
                  className={`mt-1 block text-xs leading-relaxed font-normal ${
                    featured && published
                      ? 'text-primary'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {pinDescription}
                </span>
              </span>
              <input
                type="checkbox"
                id="pinned"
                checked={Boolean(featured && published)}
                onChange={(e) => setFeatured?.(e.target.checked)}
                disabled={!published}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[var(--color-primary)] disabled:cursor-not-allowed"
              />
            </label>
          )}
          {setShowUpdated && (
            <label className="flex cursor-pointer items-start justify-between gap-4 px-6 py-5">
              <span>
                <span className="block text-sm">Show updated date</span>
                <span className="mt-1 block text-xs leading-relaxed font-normal text-zinc-500 dark:text-zinc-400">
                  Surface the latest edit date to readers.
                </span>
              </span>
              <input
                type="checkbox"
                id="show_updated"
                checked={showUpdated}
                onChange={(e) => setShowUpdated?.(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[var(--color-primary)]"
              />
            </label>
          )}
        </fieldset>
      </aside>
    </div>
  );
}
