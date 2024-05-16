import { default as dynamicImport } from "next/dynamic";

import dayjs from "dayjs";

import TagGrid from "@/app/components/portfolio/TagGrid";
const CustomTyping = dynamicImport(
	() => import("@/app/components/portfolio/CustomTyping"),
	{ ssr: true, loading: () => <div className={`inline-block leading-6`}>&nbsp;</div> }
);

dayjs.locale("ko");

interface Props {
	name: string
	description: string
	tags: string[]
	startDate: string
	endDate: string
}

const Header = ({
	name,
	description,
	tags,
	startDate,
	endDate
}: Props) => {
	return (
		<div>
			<div className={`flex flex-row sm:justify-between items-end`}>
				<div className={`font-semibold sm:text-5xl text-4xl`}>{name}</div>
				<div
					className={`font-thin sm:text-xl text-lg sm:ml-0 ml-2`}>{`${dayjs(startDate).format("YYYY.MM")} - ${dayjs(endDate).format("YYYY.MM")}`}</div>
			</div>
			<div className={`font-light sm:text-xl text-lg sm:mt-4 mt-2`}>
				<CustomTyping text={description}/>
			</div>

			{tags && tags.length > 0 && <TagGrid tags={tags}/>}
		</div>
	);
};

export default Header;
