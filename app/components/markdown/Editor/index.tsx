"use client";

import React, {FC, useCallback, useEffect, useRef} from "react";
import {
	MDXEditor,
	MDXEditorMethods,
	headingsPlugin,
	markdownShortcutPlugin,
	listsPlugin,
	quotePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	linkPlugin,
	tablePlugin,
	codeBlockPlugin,
	codeMirrorPlugin,
	linkDialogPlugin,
	imagePlugin,
	diffSourcePlugin,
	jsxPlugin
} from "@mdxeditor/editor";

import '@mdxeditor/editor/style.css';

import TabBar from "@/app/components/markdown/Editor/TabBar";
import jsxComponentDescriptors from "@/app/components/markdown/Editor/JSXComponentDescriptors";

interface EditorProps {
	title: string;
	markdown: string;
	setMarkdown: (markdown: string) => void;
}

const Editor: FC<EditorProps> = ({ title, markdown, setMarkdown }) => {
	const editorRef = useRef<MDXEditorMethods | null>(null);

	// title이 변경되면 markdown의 모든 img 태그의 src를 변경해준다.
	useEffect(() => {
		const timeout = setTimeout(() => {
			const images = markdown.match(/!\[.*]\(.*(http|https).*\..*\)/g) || [];
			images.forEach((image) => {
				const imageTitleIndex = image.split('/').findIndex((str) => str.includes('posts')) + 1;
				const imageTitle = image.split('/')[imageTitleIndex];

				if (imageTitle === title) return;

				const src = image.match(/posts\/.*\/images\/.*.png/)![0];
				const newSrc = `posts/${encodeURIComponent(title)}/images/${encodeURIComponent(src)}`;

				const renameImage = fetch(`/api/posts/images/rename`, {
					method: 'POST',
					body: JSON.stringify({
						src: 'resume/' + src,
						newSrc: 'resume/' + newSrc,
					}),
				});

				setMarkdown(markdown.replace(`${process.env.NEXT_PUBLIC_API_URL}/${src}`, `${process.env.NEXT_PUBLIC_API_URL}/${newSrc}`));
				editorRef.current?.setMarkdown(markdown.replace(`${process.env.NEXT_PUBLIC_API_URL}/${src}`, `${process.env.NEXT_PUBLIC_API_URL}/${newSrc}`));
			});
		}, 3000);

		return () => clearTimeout(timeout);
	}, [editorRef, markdown, setMarkdown, title]);

	const imageUploadHandler = useCallback(async (image: File) => {
		const response = await fetch(`/api/posts/${encodeURIComponent(title)}/images/${encodeURIComponent(image.name)}`, {
			method: 'PUT',
			body: image,
			headers: {
				'Content-Type': 'image/*',
			},
		})

		const json = await response.json()

		return json.url
	}, [title]);

	return (
		<MDXEditor
			ref={editorRef}
			markdown={markdown}
			className={`w-full`}
			onChange={(e) => setMarkdown(e)}
			contentEditableClassName={"prose"}
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				linkPlugin(),
				tablePlugin(),
				linkDialogPlugin(),
				codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
				codeMirrorPlugin({ codeBlockLanguages: { ts: 'TypeScript', js: 'JavaScript', html: 'HTML', css: 'CSS', python: "Python", cpp: 'C++', c: 'C', text: 'TEXT' } }),
				imagePlugin({ imageUploadHandler }),
				diffSourcePlugin({ diffMarkdown: '', viewMode: 'rich-text' }),
				jsxPlugin({ jsxComponentDescriptors }),
				toolbarPlugin({
					toolbarContents: () => <TabBar />}
				),
			]}
		/>
	);
};

export default Editor;
