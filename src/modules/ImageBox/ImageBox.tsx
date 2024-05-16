import { FileButton, UnstyledButton } from "@mantine/core";
import { useContext } from "react";
import { LucideRotateCcw } from "lucide-react";

import classes from "@/modules/PostDetails/classes.module.css";
import sampleImage from "@/assets/images/auth-dog.png";
import { PostFormContext } from "@/shared/lib/context";
import { cn } from "@/shared/lib/utils";

export default function FeaturedImage() {
	const { form } = useContext(PostFormContext);
	const image = form.values.image;

	const handleImage = (file: File | null) => {
		if (!file) return;
		form.setFieldValue("image", sampleImage.src);
	};

	const handleRemoveImage = () => {
		form.setFieldValue("image", "");
	}

	return (
		<div className="bg-white border border-[#C8C8C8] rounded relative">
			<p className={classes.auxiliaryHeading}>Featured image</p>
			{form.errors?.image && <p className="absolute top-12 left-4 text-[#dc362e] text-[10px]">{form.errors.image}</p>}
			<div className={cn("m-4 p-4 border-[2px] border-dashed border-[gray] flex items-center", form.errors?.image && "border-[#dc362e] hover:border-[initial] transition")}>
				{image ? (
					<div className="flex flex-col w-full">
						<img src={image} className="object-contain w-full h-full" alt="Hero image" />
						<div className="flex justify-between mt-8">
							<UnstyledButton classNames={{ root: "text-sm flex items-center gap-2" }} disabled={!form.isDirty("image")}><LucideRotateCcw size={16} />Update</UnstyledButton>
							<UnstyledButton classNames={{ root: "text-sm flex items-center gap-2" }} c="#DC362E" onClick={handleRemoveImage}>Remove</UnstyledButton>
						</div>
					</div>
				) : (
					<>
						<FileButton onChange={handleImage} accept="image/png,image/jpeg">
							{(props) => (
								<UnstyledButton {...props} classNames={{ root: "w-full bg-black text-white text-center font-bold p-2" }} aria-label="Add image" title="Add image">
									Add Image
								</UnstyledButton>
							)}
						</FileButton>
					</>
				)}
			</div>
		</div>
	);
}