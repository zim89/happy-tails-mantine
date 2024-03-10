import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Buy Dog Supplies in Kyiv | Affordable Prices, Happy Tails',
    description: "Stock up on everything your pup needs! Happy Tails offers dog clothes, furniture, toys & more at low prices. Shop now for fast shipping!"
  }

export default function Layout({children}: { children: React.ReactNode }) {
    return <>{children}</>
}