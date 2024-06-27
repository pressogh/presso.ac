'use client';

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";

import TOC from "@/app/components/blog/TOC";
import HeaderInput from "@/app/components/blog/HeaderInput";
const Editor = dynamic(() => import('@/app/components/markdown/Editor'), { ssr: false });

const BlogEditor = () => {
	const [title, setTitle] = useState<string>("");
	const [date, setDate] = useState<string>("");

	return (
		<div>
			<TOC />

			<HeaderInput title={title} setTitle={setTitle} date={date} setDate={setDate} />

			<div className={`my-10`}>
				<Suspense fallback={null}>
					<Editor markdown={'Hello World!'} />
				</Suspense>
			</div>
		</div>
	);
};

export default BlogEditor;
