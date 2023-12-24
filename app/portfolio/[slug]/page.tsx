import { default as dynamicImport } from "next/dynamic";

import Container from "@/app/components/Container";
import { getAllProjects, getProject } from "@/app/lib/portfolio/etc";
import TagGrid from "@/app/components/portfolio/TagGrid";
import dayjs from "dayjs";

const CustomTyping = dynamicImport(
	() => import("@/app/components/portfolio/CustomTyping"),
	{ ssr: true, loading: () => <div className={`inline-block leading-6`}>&nbsp;</div> }
);

dayjs.locale("ko");

export const dynamic = 'force-static';

export const generateStaticParams = async () => {
	const projects = await getAllProjects();

	return projects.map((item) => {
		return {
			slug: item.name.replace(/ /g, "-")
		};
	});
};

interface Params {
	params: {
		slug: string
	}
}

const Page = async ({ params }: Params) => {
	const { name, description, tags, startDate, endDate, content }: any = await getProject(params.slug);

	return (
		<Container>
			<div className={"sm:mt-20 mt-6"}>
				<div className={`flex flex-row sm:justify-between items-end`}>
					<div className={`font-semibold sm:text-5xl text-4xl`}>{ name }</div>
					<div className={`font-thin sm:text-xl text-lg sm:ml-0 ml-2`}>{ `${dayjs(startDate).format("YYYY.MM")} - ${dayjs(endDate).format("YYYY.MM")}` }</div>
				</div>
				<div className={`font-light sm:text-xl text-lg sm:mt-4 mt-2`}>
					<CustomTyping text={description} />
				</div>

				{ tags && tags.length > 0 && <TagGrid tags={tags} /> }

				<div className={`mt-10`}>
					{ content }
				</div>
			</div>
		</Container>
	);
};

export default Page;
