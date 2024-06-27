import React from 'react';
import {
	BlockTypeSelect, BoldItalicUnderlineToggles,
	Button, CodeToggle, CreateLink, DiffSourceToggleWrapper, InsertCodeBlock,
	InsertImage, insertJsx$, InsertTable, InsertThematicBreak, ListsToggle,
	Separator, UndoRedo, usePublisher
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
		<div className={`w-full pt-10 bg-white dark:bg-[#202021]`}>
			<div className={`flex flex-row w-full p-1.5 rounded-md overflow-x-auto justify-between items-center bg-gray-100`}>
				<div className={`flex flex-row gap-1`}>
					<UndoRedo />
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
				</div>
				<div className={`flex flex-row items-center`}>
					<DiffSourceToggleWrapper>
						{ ' ' }
					</DiffSourceToggleWrapper>
				</div>
			</div>
		</div>
	);
};

export default TabBar;
