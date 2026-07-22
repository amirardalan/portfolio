# amir.sh

The source for [amir.sh](https://amir.sh): a portfolio, MDX blog, and custom content management system built with TypeScript and React Server Components.

The CMS supports creating, editing, publishing, and organizing posts without a full redeploy by using on-demand revalidation.

## Stack

- [Next.js](https://nextjs.org/docs) App Router and React Server Components
- [TypeScript](https://www.typescriptlang.org/)
- [Auth.js](https://authjs.dev/) with GitHub OAuth
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Postgres](https://supabase.com/docs/guides/database/overview)
- [Drizzle ORM](https://orm.drizzle.team/)
- [MDX](https://mdxjs.com/) with [Sugar High](https://github.com/huozhi/sugar-high) syntax highlighting
- [Zustand](https://github.com/pmndrs/zustand) for client state
- [Cloudinary](https://cloudinary.com/) for CMS media
- [PostHog](https://posthog.com/) for analytics and post views
- [Upstash Redis](https://upstash.com/) for post likes

## Features

- Custom CMS for posts, drafts, and categories
- Owner-only GitHub OAuth
- Light, dark, and system themes
- Dynamic metadata, social images, sitemap, favicon, and page titles
- Cloudinary-backed media gallery
- PostHog analytics and post view counts
- Redis-backed post likes
- Custom tooltip, modal, toast, and navigation components
- Responsive and accessible interface

## Local Development

### Install dependencies

```bash
npm install
```

### Configure the environment

Create a `.env` file in the project root. It is ignored by Git.

```dotenv
# Application
NEXT_PUBLIC_URL="http://localhost:3000"
RESUME_URL="https://example.com/resume.pdf"

# Auth.js and GitHub OAuth
AUTH_SECRET="your-auth-secret"
AUTH_TRUST_HOST="true"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# Postgres
DB_URL="your-postgres-connection-string"
```

Create the GitHub OAuth app using the [Auth.js GitHub provider guide](https://authjs.dev/getting-started/providers/github). CMS authorization is restricted in `src/lib/auth.ts` to the repository owner's exact GitHub account ID and primary email. Forks must replace both owner identity constants before the CMS can be accessed by a different account.

Generate `AUTH_SECRET` with:

```bash
npx auth secret
```

The optional integrations use these additional variables:

```dotenv
# Cloudinary media gallery
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# PostHog analytics and post views
NEXT_PUBLIC_POSTHOG_KEY="your-project-key"
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
POSTHOG_API_KEY="your-personal-api-key"
POSTHOG_PROJECT_ID="your-project-id"
# POSTHOG_API_HOST="https://app.posthog.com"

# Upstash Redis post likes
KV_REST_API_URL="your-rest-url"
KV_REST_API_TOKEN="your-rest-token"
# Avoid Redis writes while developing when the in-memory cache is warm
ENABLE_DEV_CACHE="true"
```

### Initialize the database

```bash
npx drizzle-kit push
```

This applies the schema in `src/db/schema.ts` to the database configured by `DB_URL`.

### Run the app

```bash
npm run dev
```

The development site is available at [http://localhost:3000](http://localhost:3000).

### Production preview

```bash
npm run preview
```

This command formats the repository with Prettier, runs ESLint, creates a production build, and starts the production server. It modifies files when formatting changes are needed.

### Drizzle Studio

```bash
npx drizzle-kit studio
```

> [!NOTE]
> If you use Brave, you may need to disable Shields for `https://local.drizzle.studio/`.

## Writing Posts

Posts support Markdown and MDX.

### Images

Markdown images use the Next.js Image component. Set the optional title to `priority` for an image above the fold:

```markdown
![Alt text](https://example.com/image.png 'priority')
```

Use the custom `Figure` component to add a caption:

```mdx
<Figure
  src="https://example.com/image.png"
  alt="Descriptive alt text"
  caption="Image caption"
  priority
/>
```

Set `aspect="wide"` to display a full-width figure in a cropped 16:9 frame.
Use the optional `position` prop to control the focal point of the crop:

```mdx
<Figure
  src="https://example.com/image.png"
  alt="Descriptive alt text"
  caption="Image caption"
  aspect="wide"
  position="center"
/>
```

### Project CTAs

Use the `ProjectCTA` component to give a live project a prominent link within a
post:

```mdx
<ProjectCTA
  href="https://manifold.observer"
  title="Explore manifold.observer"
  description="Add a source, change the conditions, and watch the form reorganize in real time."
  label="Open project"
/>
```

The optional `eyebrow` defaults to `Live project`, and the optional `label`
defaults to `Open project`. External destinations open in a new tab; internal
paths use Next.js navigation.

### Highlighted code lines

Add line numbers or ranges after the language identifier:

````markdown
```typescript{2,3-5}
const first = true;
const second = true;
const third = true;
const fourth = true;
const fifth = true;
```
````

## Security

Please report vulnerabilities according to the [security policy](SECURITY.md). Do not disclose suspected vulnerabilities in a public issue.

## License

This project is available under its [custom source-available license](LICENSE.txt). Derivative works must preserve attribution, remain publicly available, use the same terms, and substantially differ in content, visual design, and branding.
