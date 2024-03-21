export async function generateMetadata() {
  return {
    title:
      'Happy Tails: Search for Dog Supplies | Find Everything Your Pup Needs!',
    description:
      'Find everything your dog needs at Happy Tails! Search for dog clothes, furniture, toys & more. Fast shipping & amazing deals!',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
