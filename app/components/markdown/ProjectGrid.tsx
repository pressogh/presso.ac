import ProjectCard from "@/app/components/markdown/ProjectCard";

import { ScreenType } from "@/types/portfolio/ScreenType";
import { ProjectType } from "@/types/portfolio/ProjectType";

interface Props {
	projects: ProjectType[]
}

const ProjectGrid = ({
	projects
}: Props) => {
	return (
		<div className={`grid sm:grid-cols-2 grid-cols-1 gap-4`}>
			{
				projects.map((item, index) => {
					return (
						<ProjectCard
							key={index}
							name={item.name}
							thumbnail={item.thumbnail}
							screenType={item.screenType as ScreenType}
							description={item.description}
							blurDataURL={item.blurDataURL}
						/>
					)
				})
			}
		</div>
	);
};

export default ProjectGrid;
