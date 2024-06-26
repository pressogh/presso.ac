import React from 'react';
import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	Button, CodeToggle, CreateLink, DiffSourceToggleWrapper, InsertCodeBlock,
	InsertFrontmatter, InsertImage,
	insertJsx$, InsertTable, InsertThematicBreak, ListsToggle,
	Separator,
	UndoRedo,
	usePublisher
} from "@mdxeditor/editor";

const InsertConclusion = () => {
	const insertJsx = usePublisher(insertJsx$);

	return (
		<Button
			onClick={() =>
				insertJsx({
					name: 'Conclusion',
					kind: 'text',
					props: {}
				})
			}
		>
			<div className={`size-6 text-center`}>&quot;</div>
		</Button>
	)
}

const TabBar = () => {
	return (
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
			<InsertConclusion />
			<DiffSourceToggleWrapper>
				{ ' ' }
			</DiffSourceToggleWrapper>
		</>
	);
};

export default TabBar;
