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
	InsertTable,
	tablePlugin,
	codeBlockPlugin,
	codeMirrorPlugin,
	frontmatterPlugin,
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CodeToggle,
	CreateLink,
	linkDialogPlugin,
	InsertCodeBlock,
	InsertFrontmatter,
	InsertImage,
	imagePlugin,
	InsertThematicBreak,
	ListsToggle,
	UndoRedo,
	Separator,
	DiffSourceToggleWrapper,
	diffSourcePlugin
} from "@mdxeditor/editor";

import '@mdxeditor/editor/style.css'

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
				toolbarPlugin({
					toolbarContents: () => (
						<>
							<UndoRedo />
							<Separator />
							<InsertFrontmatter />
							<Separator />
							<BoldItalicUnderlineToggles />
							<Separator />
							<BlockTypeSelect />
							<Separator />
							<InsertThematicBreak />
							<ListsToggle />
							<Separator />
							<CreateLink />
							<CodeToggle />
							<InsertCodeBlock />
							<InsertImage />
							<InsertTable />
							<DiffSourceToggleWrapper>
								{ ' ' }
							</DiffSourceToggleWrapper>
						</>
					)}
				),
			]}
		/>
	);
};

export default Editor;
