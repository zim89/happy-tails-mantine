import { messages } from "@/modules/AdminInboxDisplay/lib/mock";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type GenerateMetadataProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export const generateMetadata = ({ params }: GenerateMetadataProps): Metadata => {
    const message = messages.find(msg => msg.id.toString() === params.id);

    if (!message) return notFound();

    return {
        title: `Message from ${message?.sender} (#${message.id})`,
        robots: {
            index: false
        }
    };
}

type Props = {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return <>{children}</>
};