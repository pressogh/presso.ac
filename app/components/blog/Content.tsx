'use client';

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

import MDXComponents from "@/app/components/markdown/MDXComponents";
import Conclusion from "@/app/components/markdown/Conclusion";

interface Props {
	data: MDXRemoteProps
}

const Content = ({ data }: Props) => {
	return (
		<div className={`[&_img]:my-5`}>
			<MDXRemote {...data} components={{ ...MDXComponents({ Conclusion }) }} />
		</div>
	);
};

export default Content;
