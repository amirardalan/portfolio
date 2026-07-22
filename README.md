# portfolio (amir.sh)

A Markdown Blog and CMS written in TypeScript with React Server Components. Create, edit, and manage blog posts and categories inside a custom CMS. Update static posts without a build leveraging the power of on-demand revalidation.

### Stack

- TypeScript
- [Next.js](https://nextjs.org/docs/getting-started) App Router
- [Auth.js](https://authjs.dev/) auth
- [Tailwind CSS](https://tailwindcss.com/docs/installation) styles
- [Supabase](https://supabase.com/docs/guides/database/overview) Postgres database
- [Drizzle ORM](https://orm.drizzle.team/) for Postgres
- [MDX](https://mdxjs.com/) Markdown
- [Sugar High](https://github.com/huozhi/sugar-high) syntax highlighting
- [Zustand](https://github.com/pmndrs/zustand) state management
- [CLSX](https://github.com/lukeed/clsx) `className` logic

### Features

- Custom CMS (Publish, Edit, Manage Drafts and Categories)
- Light/Dark/System Theme toggle
- Dynamic (theme-based) favicon
- Dynamic Metadata and Page Titles
- Route-based active navigation highlighting
- Dynamic footer copyright date
- Custom Tooltip, Modal, and Toast components
- Next.js [optimized fonts](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images)
- [OG Image](https://vercel.com/docs/functions/og-image-generation) metadata
- Dynamically-generated [sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- Custom [Cloudinary](https://cloudinary.com/) CMS Media Gallery
- [PostHog](https://posthog.com/) analytics and blog post view count
- Blog likes with [Upstash](https://upstash.com/) Redis
- Accessibility, performance, and SEO best practices
- 100% Lighthouse score

## Getting Started

### Setup

```bash
npm install
```

Then, set up your [GitHub OAuth app](https://authjs.dev/getting-started/providers/github?framework=next-js) and add your GitHub Client ID and Secret in a `.env.local` file:

```
// .env.local

# Set for each environment
NEXT_PUBLIC_URL="http://localhost:3000"

# Set your timezone
NEXT_PUBLIC_TIMEZONE="America/Los_Angeles"

# Resume Link (redirect in next.config.ts)
RESUME_URL=<your-resume-url>

# Auth.js
AUTH_SECRET=<your-auth-secret>
AUTH_TRUST_HOST="NEXT_PUBLIC_URL"

# GitHub OAuth
AUTH_GITHUB_ID=<your-github-client-id>
AUTH_GITHUB_SECRET=<your-github-client-secret>

# Email verification (CMS Users)
ALLOWED_EMAILS=<you@email.com, other@email.com>
ALLOWED_EMAIL_DOMAINS=<gmail.com, your-domain.com>

# Supabase (CMS Database)
DB_URL=<your-supabase-transaction-pooler-url>
DB_API_KEY=<your-supabase-api-key>

# Cloudinary (CMS Media Gallery)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_URL=<your-cloudinary-url>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

# PostHog (Analytics)
NEXT_PUBLIC_POSTHOG_KEY=<your-posthog-key>
NEXT_PUBLIC_POSTHOG_HOST=<your-posthog-host>
POSTHOG_API_KEY=<your-posthog-api-key>
POSTHOG_PROJECT_ID=<your-posthog-project-id>

# Upstash/Redis (Blog Likes)
ENABLE_DEV_CACHE="true"
KV_URL=<your-upstash-kv-url>
KV_REST_API_READ_ONLY_TOKEN=<your-kv-rest-api-read-only-token>
REDIS_URL=<your-redis-url>
KV_REST_API_TOKEN=<your-kv-rest-api-token>
KV_REST_API_URL=<your-kv-rest-api-url>
```

Finally, generate an Auth.js secret, which will automatically overwrite the placeholder in the `.env.local` file:

```bash
npx auth secret
```

### Database

```bash
npx drizzle-kit push
```

> [!NOTE]
> This command will create the database tables and columns based on the schema defined in `./src/db/schema.ts` file.

### Run

```bash
npm run dev
```

### Preview

To test on-demand revalidation of blog posts and ensure the app is in good shape for production, compile a preview build.

```bash
npm run preview
```

> [!NOTE]
> This script will format the project using Prettier, check linting, and then compile a preview build.

### Drizzle Studio

To interact with the postgres database locally:

```bash
npx drizzle-kit studio
```

> [!NOTE]
> If using Brave browser you must turn Brave Shield off for `https://local.drizzle.studio/`

### Markdown Features

#### Images

Blog posts are written in Markdown. Markdown images will utilize the Next Image component for optimized loading. The markdown image can be passed a priority prop:

```markdown
![Alt text](https://example.com/image.png 'priority')
```

Or you can use an image wrapped in a custom MDX `<Figure>` component to add a caption (this also works with an optional priority prop for images above the fold):

```markdown
<Figure src="your-image-src.png" alt="Your Image Alt" caption="Your Image Caption" priority />
```

#### Code

Highlight individual lines or blocks of code (line 2 and lines 3-5):

````
```typescript{2,3-5}
````
