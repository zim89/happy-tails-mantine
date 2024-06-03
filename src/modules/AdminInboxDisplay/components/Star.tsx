import { UnstyledButton } from "@mantine/core";
import { LucideStar } from 'lucide-react';

type Props = {
    starred: boolean;
}
export const Star = ({ starred }: Props) => {
    return (
        <UnstyledButton>
            {starred ? <LucideStar stroke='#FBBC04' fill='#FBBC04' size={16} /> : <LucideStar size={16}/>}
        </UnstyledButton>
    );
};