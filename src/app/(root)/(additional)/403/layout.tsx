import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unauthorized Access",
    robots: {
        index: false
    }
}

type Props = {
    children: React.ReactNode;
}
export default function Layout({ children }: Props) {
    return (
        <>{children}</>
    );
}