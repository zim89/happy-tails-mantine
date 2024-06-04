import { UnstyledButton } from "@mantine/core";
import { LucideStar } from 'lucide-react';
import { Dispatch, SetStateAction } from "react";

type Props = {
    id: number;
    starred: boolean;
    setStarred: Dispatch<SetStateAction<number[]>>
}
export const Star = ({ id, starred, setStarred }: Props) => {
    const star = (id: number) => {
        setStarred(prev => [...prev, id]);
    }

    const unstar = (id: number) => {
        setStarred(prev => prev.filter(candidate => candidate !== id))
    }

    return (
        <UnstyledButton onClick={starred ? unstar.bind(null, id) : star.bind(null, id)}>
            {starred ? <LucideStar stroke='#FBBC04' fill='#FBBC04' size={16} /> : <LucideStar size={16}/>}
        </UnstyledButton>
    );
};