export const metadata = {
    title: "Create new post",
    robots: {
        index: false
    }
}

type Props = {
    children: React.ReactNode ;
}

export default function Layout({ children }: Props) {
    return (
        <>{children}</>
    );
}