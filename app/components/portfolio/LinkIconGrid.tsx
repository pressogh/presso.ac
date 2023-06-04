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
					<a key={index} href={link.url} target={`_blank`} rel="noopener noreferrer">
						<div className={`flex flex-col gap-3`}>
							<LinkIcon icon={link.icon} />
							<div className={`text-ellipsis whitespace-nowrap overflow-hidden font-semibold text-xs sm:text-base`}>{ link.name }</div>
						</div>
					</a>
				))
			}
		</div>
	);
};

export default LinkIconGrid;
