type MessageStatus = "read" | "unread";

export type Message = {
    id: number;
    starred: boolean;
    sender: string;
    title: string;
    status: MessageStatus;
    sentAt: string;
    message: string;
}

export const messages: Message[] = [
    {
        id: 0,
        starred: true,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Susan Champlin",
        status: "read",
        sentAt: Date.now().toString(),
        message: "cmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"
    },
    {
        id: 1,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
]