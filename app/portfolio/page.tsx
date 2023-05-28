import Container from "@/app/components/Container";
import ProjectGrid from "@/app/components/portfolio/ProjectGrid";

const getProjects = async () => {
	const res = await fetch("http://localhost:3000/api/projects");
	return await res.json();
}
const Page = async () => {
	const projects = await getProjects();
	
	return (
		<>
			<Container>
				<div className={`font-light sm:text-xl mt-10 text-md`}>
					지금까지 총 <span className={`font-medium`}>{projects.length}</span>개의 프로젝트를 진행했어요.
				</div>
				<hr className={`mt-3 mb-10`} />
				<ProjectGrid projects={projects} />
			</Container>
		</>
	);
};

export default Page;
