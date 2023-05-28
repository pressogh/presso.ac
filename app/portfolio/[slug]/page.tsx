import Container from "@/app/components/Container";
import {ProjectType} from "@/types/ProjectType";

// TODO: dynamicParams is not working
const dynamicParams = false;
export { dynamicParams };

export const generateStaticParams = async () => {
	const res = await fetch(`http://localhost:3000/api/projects`);
	const projects = await res.json();
	
	return projects.map((item: ProjectType) => {
		return {
			params: {
				slug: item.name.replace(/ /g, "-")
			}
		}
	});
};

const getProjects = async (params: {
	slug: string
}) => {
	const res = await fetch(`http://localhost:3000/api/projects/${params.slug}`);
	return await res.json();
};

interface Params {
	params: {
		slug: string
	}
}

interface Props {
	name: string,
	description?: string,
	content: string
}

const Page = async ({ params }: Params) => {
	const { name, description, content }: Props = await getProjects(params);
	
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
