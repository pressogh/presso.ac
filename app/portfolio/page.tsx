import { ProjectType } from "@/types/portfolio/ProjectType";

import Container from "@/app/components/Container";
import ProjectGrid from "@/app/components/markdown/ProjectGrid";

export const dynamic = "force-dynamic";

const getData = async () => {
	return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`).then((res) => res.json());
}

const Page = async () => {
	const projects: ProjectType[] = await getData();

	return (
		<Container>
			<div className={`font-light sm:text-xl mt-10 text-md`}>
				지금까지 총 <span className={`font-medium`}>{projects.length}</span>개의 프로젝트를 진행했어요.
			</div>
			<hr className={`mt-3 mb-10`} />
			<ProjectGrid projects={projects} />
		</Container>
	);
};

export default Page;
