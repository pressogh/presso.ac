"use client";

import React, { FC, useCallback, useRef } from "react";
import {
	codeBlockPlugin,
	codeMirrorPlugin,
	diffSourcePlugin,
	headingsPlugin,
	imagePlugin,
	jsxPlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	MDXEditor,
	MDXEditorMethods,
	quotePlugin,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin
} from "@mdxeditor/editor";

import '@mdxeditor/editor/style.css';

import TabBar from "@/app/components/markdown/Editor/TabBar";
import jsxComponentDescriptors from "@/app/components/markdown/Editor/JSXComponentDescriptors";

interface EditorProps {
	markdown: string;
	setMarkdown: (markdown: string) => void;
}

const Editor: FC<EditorProps> = ({ markdown, setMarkdown }) => {
	const editorRef = useRef<MDXEditorMethods | null>(null);

	const imageUploadHandler = useCallback(async (image: File) => {
		return URL.createObjectURL(image);
	}, []);

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
