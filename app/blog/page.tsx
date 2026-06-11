import type { Metadata } from 'next';
import { fetchBlogPosts } from '@/lib/medium';
import BlogClient from './BlogClient';

export const revalidate = 3600; // ISR: revalidate hourly

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Field notes from the next wave of consumer. Theses, founder playbooks, and the tools we use to build leaner, written by the Press On team.',
};

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <div className="eyebrow reveal">Blog</div>
          <h1 className="reveal reveal-d1">Field notes from the next wave of consumer.</h1>
          <p className="lede reveal reveal-d2">
            Theses, founder playbooks, and the tools we use to build leaner, written by the Press
            On team and published on Medium.
          </p>
        </div>
      </header>

      <BlogClient posts={posts} />
    </>
  );
}
