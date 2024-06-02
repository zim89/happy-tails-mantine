import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    // TODO: Track incoming messages
    const newMessages = 4; 

    return {
        title: `Inbox (${newMessages})`,
        robots: {
            index: false
        }    
    };
}

type Props = {
    children: React.ReactNode;
}
export default function Layout({ children }: Props) {
    return (
        <>
            {children}
        </>
    );
}