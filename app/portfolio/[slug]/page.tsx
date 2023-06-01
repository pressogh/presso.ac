import Container from "@/app/components/Container";
import { getAllProjects, getProject } from "@/app/lib/etc";
import CustomTyping from "@/app/components/portfolio/CustomTyping";
import TagGrid from "@/app/components/portfolio/TagGrid";

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
	const { name, description, tags, content }: any = await getProject(params.slug);
	
	return (
		<>
			<Container>
				<div className={"mt-20"}>
					<div className={`font-semibold text-5xl`}>{ name }</div>
					<div className={`font-light text-xl mt-4`}>
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
