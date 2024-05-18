"use client";

import DOMPurify from "dompurify";

type Props = {
	content: string;
}

export const PostContent = ({ content }: Props) => {
	const sanitizedData = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });

	return (
		<div dangerouslySetInnerHTML={{ __html: sanitizedData }} />
	);
}