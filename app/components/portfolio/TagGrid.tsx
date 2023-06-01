import Tag from "@/app/components/portfolio/Tag";

interface Props {
	tags: []
}

const TagGrid = ({ tags }: Props) => {
	return (
		<div className={`mt-4`}>
			{
				tags.map((tag, index) => (
					<Tag key={index} tag={tag} />
				))
			}
		</div>
	);
};

export default TagGrid;
