import Container from "@/app/components/Container";
import { getAllProjects, getProject } from "@/app/lib/etc";
import CustomTyping from "@/app/components/portfolio/CustomTyping";
import TagGrid from "@/app/components/portfolio/TagGrid";
import dayjs from "dayjs";

dayjs.locale("ko");

const dynamicParams = false;
export { dynamicParams };

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
		<>
			<Container>
				<div className={"mt-20"}>
					<div className={`flex flex-row justify-between items-end`}>
						<div className={`font-semibold sm:text-5xl text-4xl`}>{ name }</div>
						<div className={`font-thin sm:text-xl text-base`}>{ `${dayjs(startDate).format("YYYY.MM")} - ${dayjs(endDate).format("YYYY.MM")}` }</div>
					</div>
					<div className={`font-light sm:text-xl text-base mt-4`}>
						<CustomTyping>
							{ description }
						</CustomTyping>
					</div>
					
					{ tags && tags.length > 0 && <TagGrid tags={tags} /> }
					
					<div className={`mt-10`}>
						{ content }
					</div>
				</div>
			</Container>
		</>
	);
};

export default Page;
