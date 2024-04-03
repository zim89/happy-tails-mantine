import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Happy Tails: Secure Checkout - Get Your Dog's Goodies Fast!",
    description: "Securely checkout at Happy Tails & get your dog's favorite supplies delivered quickly! Enjoy fast shipping & hassle-free returns."
  }

export default function Layout({children}: { children: React.ReactNode }) {
    return <section className="section">{children}</section>
}