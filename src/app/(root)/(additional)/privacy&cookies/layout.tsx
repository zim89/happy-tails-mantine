import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Happy Tails: Privacy & Cookies Policy",
    description: "Learn how Happy Tails protects your privacy and the information you share. We value your trust!"
}

type Props = {
    children: React.ReactNode
}
export default function Layout({ children }: Props) {
    return (
        <>{children}</>
    );
}