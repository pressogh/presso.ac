interface Props {
	tag: string
}

const Tag = ({ tag }: Props) => {
	return (
		<div
			className={`
				bg-slate-200
				dark:bg-slate-700
				text-zinc-700
				dark:text-white
				px-3
				py-0.5
				text-sm
				rounded-3xl
			`}
		>
			{ tag }
		</div>
	);
};

export default Tag;
