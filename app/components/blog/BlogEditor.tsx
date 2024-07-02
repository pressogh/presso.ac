'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

import dayjs from "dayjs";

import HeaderInput from "@/app/components/blog/HeaderInput";
const Editor = dynamic(() => import('@/app/components/markdown/Editor'), { ssr: false });

dayjs.locale("ko");

const BlogEditor = () => {
	const searchParams = useSearchParams();

	const [markdown, setMarkdown] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [lastTitle, setLastTitle] = useState<string>("");

	useEffect(() => {
		if (searchParams.has("post")) {
			const post = searchParams.get("post") as string;
			fetch(`/api/posts/${encodeURIComponent(post)}`)
				.then(res => res.json())
				.then(data => {
					setTitle(data.title);
					setDate(data.date);
					setDescription(data.description);
					setMarkdown(data.markdown);
					setLastTitle(data.title);
				})
				.catch(() => {
					setTitle(post);
				});
		}
		else {
			setDate(dayjs().format("YYYY-MM-DD"));
		}
	}, [searchParams]);

	return (
		<div>
			<HeaderInput
				title={title} setTitle={setTitle}
				date={date} setDate={setDate}
				description={description} setDescription={setDescription}
				markdown={markdown} lastTitle={lastTitle}
			/>

			<Suspense fallback={null}>
				<Editor markdown={markdown} setMarkdown={setMarkdown} />
			</Suspense>
		</div>
	);
};

export default BlogEditor;
