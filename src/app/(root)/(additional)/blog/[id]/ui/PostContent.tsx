"use client";

import DOMPurify from "dompurify";
import ReactHtmlParser from "react-html-parser";

type Props = {
	content: string;
}

export const PostContent = ({ content }: Props) => {
	const sanitizedData = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });

	return (
		<div>{ReactHtmlParser(sanitizedData)}</div>
	);
}