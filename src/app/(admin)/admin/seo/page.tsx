import { Metadata } from 'next';

import Analytics from "@/modules/Analytics";

export const metadata: Metadata = {
  title: 'SEO Admin',
  description: null,
  robots: {
    index: false,
  },
};

export default function SeoPage() {
  return (
    <div>
      <h1>Seo page</h1>
      <Analytics />
    </div>
  );
}
