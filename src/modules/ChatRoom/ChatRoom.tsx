import { CustomBadge } from "@/components/Badge";
import { Box } from "@mantine/core";

const mockChat = {
    id: 1,
    author: "Everett Huel",
    authorEmail: "ddobosiewicz@almatur.pl",
    status: "new",
    sent: "Aug 26, 2023 (02:30)",
    recipientEmail: "admin@example.com",
    subject: "Warranty and Returns",
    content: "Ad rem voluptatem dolorum qui. Dolorem minima aut. Porro asperiores harum officia voluptatem autem explicabo explicabo qui tenetur. Recusandae similique quis debitis et dolorum tempora. Temporibus distinctio ipsa exercitationem enim provident nisi incidunt. Aliquid laboriosam consequatur nesciunt quasi nihil et. Ut tempora molestiae. Quod voluptas delectus at aliquid. Iure ut repudiandae. Voluptatem possimus ducimus molestias dicta mollitia minima deleniti. Ut rerum qui autem voluptatibus earum quia officia. Debitis nulla commodi repellat libero sint voluptas deleniti praesentium ut. Voluptas harum cupiditate in itaque ea at eum rerum. Itaque voluptate ea est et aliquam aliquam eum culpa. Qui sed magnam et hic facere eum laborum magnam ratione.",
    attachments: [],
};

type Props = {
    id: string;
}

export default function ChatRoom({ id }: Props) {
    return (
        <Box className="bg-white">
            <div>
                <p>
                    <b>{mockChat.author}</b>
                    <span>{mockChat.authorEmail}</span>
                    {mockChat.status === "new" && <CustomBadge name={mockChat.status.toUpperCase()} color={mockChat.status} palette={{ new: "" }}/>}
                </p>
                <div></div>
            </div>
        </Box>
    );
} 