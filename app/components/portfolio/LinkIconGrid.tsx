import LinkIcon from "@/app/components/portfolio/LinkIcon";

interface Props {
	links: Array<{
		name: string,
		url: string,
		icon: string
	}>
}

const LinkIconGrid = ({ links }: Props) => {
	return (
		<div className={`mt-6 grid grid-cols-4 gap-8`}>
			{
				links.map((link, index) => (
					<a href={link.url} target={`_blank`} rel="noopener noreferrer">
						<div key={index} className={`flex flex-col gap-3`}>
							<LinkIcon icon={link.icon} src={link.url} />
							<div className={`font-semibold`}>{ link.name }</div>
						</div>
					</a>
				))
			}
		</div>
	);
};

export default LinkIconGrid;
