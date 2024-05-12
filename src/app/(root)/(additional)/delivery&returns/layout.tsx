import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Happy Tails: Fast Shipping & Easy Returns on Dog Supplies",
  description: "Get your dog supplies quickly & easily at Happy Tails! Enjoy fast shipping & hassle-free returns. Shop now for peace of mind!"
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
