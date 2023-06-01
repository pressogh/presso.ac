interface Props {
	tag: string
}

const Tag = ({ tag }: Props) => {
	return (
		<div className={`inline-flex mr-1 mb-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-white px-3 py-0.5 rounded-3xl`}>
			{ tag }
		</div>
	);
};

export default Tag;
