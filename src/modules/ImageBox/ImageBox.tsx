"use client";

import { FileButton, UnstyledButton } from "@mantine/core";
import { useContext } from "react";
import { LucideRotateCcw, UploadCloud } from "lucide-react";
import Image from "next/image";

import classes from "./classes.module.css";
import { PostFormContext } from "@/shared/lib/context";
import { cn } from "@/shared/lib/utils";

export default function FeaturedImage() {
	const { form } = useContext(PostFormContext);
	const image = form.values.image;

	const handleImage = (file: File | null) => {
		if (!file) return;
		form.setFieldValue("image", file);
	};

	const handleRemoveImage = () => {
		form.setFieldValue("image", null);
	}

	return (
		<div className="bg-white border border-[#C8C8C8] rounded relative">
			<p className={classes.auxiliaryHeading}>Featured image</p>
			{form.errors?.image && <p className="absolute top-12 left-4 text-[#dc362e] text-[10px]">{form.errors.image}</p>}
			<div className={cn("m-4 p-3 py-6 flex items-center", classes.borderedBox, form.errors?.image && classes.error)}>
				{image ? (
					<div className="flex flex-col w-full">
						<div className="min-h-[120px] relative">
							<Image 
								src={typeof image === "string" ? image : URL.createObjectURL(image)} 
								layout="fill"
								style={{ objectFit: "cover" }}
								alt="Poster image" 
							/>
						</div>
						<div className="flex justify-between mt-8">
							<UnstyledButton classNames={{ root: "text-sm flex items-center gap-2" }} disabled={!form.isDirty("image")}><LucideRotateCcw size={16} />Update</UnstyledButton>
							<UnstyledButton classNames={{ root: "text-sm flex items-center gap-2" }} c="#DC362E" onClick={handleRemoveImage}>Remove</UnstyledButton>
						</div>
					</div>
				) : (
					<>
						<FileButton onChange={handleImage} accept="image/png,image/jpeg">
							{(props) => (
								<UnstyledButton {...props} classNames={{ root: "rounded-[2px] flex items-center justify-center gap-2 w-full bg-[#5A5A5A] text-white font-bold p-2" }} aria-label="Add image" title="Add image">
									<UploadCloud size={20} /> Add Image
								</UnstyledButton>
							)}
						</FileButton>
					</>
				)}
			</div>
		</div>
	);
}