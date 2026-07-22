import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { userExists, createUser } from '@/db/queries/users';

const OWNER_EMAIL = 'hi@amir.sh';
const OWNER_GITHUB_ID = '6297460';

export function isOwnerIdentity(
  email: string | null | undefined,
  githubId: string | null | undefined
): boolean {
  return (
    email?.trim().toLowerCase() === OWNER_EMAIL && githubId === OWNER_GITHUB_ID
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (
        account?.provider !== 'github' ||
        !isOwnerIdentity(user.email, account.providerAccountId)
      ) {
        return false;
      }

      const exists = await userExists(user.email!);

      if (!exists) {
        await createUser(user.name || 'Unknown User', user.email!);
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account?.provider === 'github') {
        token.githubId = account.providerAccountId;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.githubId =
        typeof token.githubId === 'string' ? token.githubId : undefined;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/owner',
    error: '/auth/error',
  },
});

export async function getAuthorizedSession() {
  const session = await auth();

  if (!isOwnerIdentity(session?.user?.email, session?.user?.githubId)) {
    return null;
  }

  return session;
}

export async function isAuthorized() {
  return (await getAuthorizedSession()) !== null;
}
