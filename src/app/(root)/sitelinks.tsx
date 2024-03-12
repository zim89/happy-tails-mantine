import Head from "next/head";
import Script from "next/script";

const sitelinksBox = {
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  name: 'Happy Tails',
  url: 'https://happy-tails-mantine.vercel.app',
  potentialAction: {
    '@type': 'SearchAction',
    target:
      'https://happy-tails-mantine.vercel.app/search?name={search_term_string}?page=1',
    'query-input': 'required name=search_term_string',
  },
};

export default function Sitelinks() {
  return (
      <Script
        id="sitelinks"
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksBox) }}
      />

  );
}
