"use client";

import React, { FC } from "react";
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
	frontmatterPlugin,
	linkDialogPlugin,
	imagePlugin,
	diffSourcePlugin,
	JsxComponentDescriptor,
	jsxPlugin, NestedLexicalEditor
} from "@mdxeditor/editor";

import '@mdxeditor/editor/style.css'
import TabBar from "@/app/components/markdown/Editor/TabBar";

async function imageUploadHandler(image: File) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${encodeURI("NextJS Yarn Berry 적용기")}/images/${image.name}`, {
		method: 'PUT',
		body: image,
		headers: {
			'Content-Type': 'image/jpeg',
		},
	})

	const json = await response.json()

	return json.url
}

interface EditorProps {
	markdown: string;
	editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
	{
		name: 'Conclusion',
		kind: 'flow',
		source: '@/app/components/markdown/Conclusion.tsx',
		props: [{ name: 'text', type: 'string' }],
		hasChildren: false,
		Editor: () => {
			return (
				<div style={{ border: '1px solid red', padding: 8, margin: 8, display: 'inline-block' }}>
					<NestedLexicalEditor
						getContent={(node) => node.children}
						getUpdatedMdastNode={(mdastNode, children: any) => {
							return { ...mdastNode, children }
						}}
					/>
				</div>
			)
		}
	}
]

const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
	return (
		<MDXEditor
			ref={editorRef}
			markdown={markdown}
			className={`w-full h-96`}
			onChange={(e) => console.log(e)}
			contentEditableClassName="prose"
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				linkPlugin(),
				tablePlugin(),
				frontmatterPlugin(),
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
