import DarkButton from "@/components/DarkButton";
import LightButton from "@/components/LightButton";
import PreviewButton from "@/components/PreviewButton";

type ChildrenProps = {
	DarkButton: typeof DarkButton;
	LightButton: typeof LightButton;
	PreviewButton: typeof PreviewButton;
}
type Props = {
	children: (props: ChildrenProps) => React.ReactNode;
}

export default function Controls({ children }: Props) {
	return (
		<>
			{children({
				DarkButton,
				LightButton,
				PreviewButton
			})}
		</>
	);
}