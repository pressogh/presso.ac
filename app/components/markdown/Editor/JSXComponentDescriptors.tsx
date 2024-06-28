import { JsxComponentDescriptor, NestedLexicalEditor } from "@mdxeditor/editor";

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
	{
		name: 'Conclusion',
		kind: 'text',
		source: '@/app/components/markdown/Conclusion.tsx',
		props: [],
		hasChildren: true,
		Editor: () => {
			return (
				<div className={`text-2xl font-light italic w-full flex justify-center items-center mt-6`}>
					&quot;{` `}
					<NestedLexicalEditor
						getContent={(node) => node.children}
						getUpdatedMdastNode={(mdastNode, children: any) => {
							return { ...mdastNode, children }
						}}
					/>
					&#34;
				</div>
			)
		}
	}
]

export default jsxComponentDescriptors;
