import { UnstyledButton } from "@mantine/core";

type Props = {
    handler: () => void;
    children: React.ReactNode;
}

export default function LightButton({ handler, children }: Props) {
    return (
        <>
            <UnstyledButton
                classNames={{
                    root: 'text-black text-sm font-bold border w-[150px] text-center rounded-[2px] border-[#C8C8C8] border-solid py-[10px]',
                }}
                onClick={handler}
            >
                {children}
            </UnstyledButton>
        </>
    );
}