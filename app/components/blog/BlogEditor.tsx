'use client';

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import dayjs from "dayjs";

import HeaderInput from "@/app/components/blog/HeaderInput";
const Editor = dynamic(() => import('@/app/components/markdown/Editor'), { ssr: false });

dayjs.locale("ko");

const BlogEditor = () => {
	const [markdown, setMarkdown] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	useEffect(() => {
		setDate(dayjs().format("YYYY-MM-DD"));
	}, []);

	return (
		<div>
			<HeaderInput
				title={title} setTitle={setTitle}
				date={date} setDate={setDate}
				description={description} setDescription={setDescription}
				markdown={markdown}
			/>

			<Suspense fallback={null}>
				<Editor markdown={markdown} setMarkdown={setMarkdown} />
			</Suspense>
		</div>
	);
};

export default BlogEditor;
