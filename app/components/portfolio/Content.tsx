'use client';

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

import MDXComponents from "@/app/components/markdown/MDXComponents";
import LinkIconGrid from "@/app/components/markdown/LinkIconGrid";
import LinkIcon from "@/app/components/markdown/LinkIcon";

interface Props {
	data: MDXRemoteProps
}

const Content = ({ data }: Props) => {
	return <MDXRemote {...data} components={{ ...MDXComponents({}), LinkIconGrid, LinkIcon }}  />
};

export default Content;
