import { UnstyledButton } from "@mantine/core";

type Props = {
	handler: () => void;
	children: React.ReactNode;
}

export default function DarkButton({ handler, children }: Props) {
	return (
		<>
			<UnstyledButton
				classNames={{
					root: 'rounded-[2px] text-sm font-bold bg-black w-[150px] text-center py-[10px] text-white'
				}}
				onClick={handler}
			>
				{children}
			</UnstyledButton>
		</>
	);
}