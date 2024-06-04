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
    {
        id: 2,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 3,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 4,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 5,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 6,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 7,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 8,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 9,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 10,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 11,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 12,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 13,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 14,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    },
    {
        id: 15,
        starred: false,
        title: "Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.",
        sender: "Kari Hermiston",
        status: "unread",
        sentAt: Date.now().toString(),
        message: "duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    }
]