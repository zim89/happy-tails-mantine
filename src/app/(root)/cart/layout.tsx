import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Happy Tails | Your Shopping Cart is Waiting!",
    description: "Review your cart & complete your purchase at Happy Tails! Enjoy fast shipping & amazing deals on dog supplies."
  }

export default function Layout({ children }: { children: React.ReactNode }) {
    return <section className="section">{children}</section>
}