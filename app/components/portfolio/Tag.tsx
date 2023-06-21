interface Props {
	tag: string
}

const Tag = ({ tag }: Props) => {
	return (
		<div
			className={`
				bg-indigo-100
				dark:bg-indigo-900
				text-indigo-900
				dark:text-white
				px-3
				py-0.5
				sm:text-base
				text-sm
				rounded-3xl
			`}
		>
			{ tag }
		</div>
	);
};

export default Tag;
