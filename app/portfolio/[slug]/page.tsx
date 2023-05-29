import Container from "@/app/components/Container";
import {getAllProjects, getProject} from "@/app/lib/etc";

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
	const { name, description, content }: any = await getProject(params.slug);
	
	return (
		<Container>
			<div className={"mt-20"}>
				<div className={`font-bold text-3xl`}>{ name }</div>
				<div className={`font-light text-md`}>{ description }</div>
				<div className={`mt-10`} dangerouslySetInnerHTML={{ __html: content }} />
			</div>
		</Container>
	);
};

export default Page;