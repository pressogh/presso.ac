'use client';

import { ContentType } from '@/types/about/WorkExperienceType';
import Info from '@/app/components/about/WorkExperience/Info';
import Project from '@/app/components/about/WorkExperience/Project';

interface Props {
	contents: ContentType[];
}

const Contents = ({ contents }: Props) => {
	return (
		<div className={`flex w-full flex-col gap-10 text-sm sm:text-base`}>
			{contents.map((content, index) => {
				return (
					<div
						key={content.name}
						className={`flex w-full flex-col justify-between md:flex-row`}
					>
						<Info
							name={content.name}
							position={content.position}
							description={content.description}
							startDate={content.startDate}
							endDate={content.endDate}
						/>

						<div
							className={`flex flex-[5_5_0%] flex-col gap-8 border-l-[3px] border-l-[#4B6EA0] pl-4 md:border-none md:p-0`}
						>
							{content.projects.map((project, index) => {
								return (
									<div key={project.title.text}>
										<Project project={project} />
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Contents;
