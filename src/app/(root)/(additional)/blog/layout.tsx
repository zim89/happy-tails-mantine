import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Happy Tails Blog: Tips & Tricks for Dog Lovers",
    description: "Get expert tips & advice for raising happy, healthy dogs on the Happy Tails Blog! Discover training guides, breed information, & more!"
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="section">{children}</section>
    )
}