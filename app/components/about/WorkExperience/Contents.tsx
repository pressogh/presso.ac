'use client';

import { ContentType } from "@/types/about/WorkExperienceType";
import dayjs from "dayjs";
import useWindowSize from "@/app/hooks/useWindowSize";
import Info from "@/app/components/about/WorkExperience/Info";
import Project from "@/app/components/about/WorkExperience/Project";

let customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.locale("ko");
dayjs.extend(customParseFormat);

interface Props {
	contents: ContentType[]
}

const Contents = ({ contents }: Props) => {
	const windowSize = useWindowSize();

	return (
		<div className={`flex flex-col gap-10 w-full sm:text-base text-sm`}>
			{
				contents.map((content, index) => {
					return (
						<div key={content.name} className={`flex md:flex-row flex-col justify-between w-full`}>
							{
								(windowSize.width && windowSize.width >= 768) ? (
									<Info name={content.name} position={content.position} description={content.description} startDate={content.startDate} endDate={content.endDate} />
								) : (
									<div className={`text-sm mb-4`}>
										<div className={`text-xl font-medium mb-2`}>{ content.name }</div>
										<div>
											{ content.startDate && dayjs(content.startDate, "YYYY.MM").format("YYYY.MM") }
											{ (content.startDate || content.endDate) && ' ~ ' }
											{ content.endDate && dayjs(content.endDate, "YYYY.MM").format("YYYY.MM") }
										</div>
										<div>{ content.position }</div>
										<div className={`text-neutral-500`}>{ content.description }</div>
									</div>
								)
							}

							<div className={`flex-[5_5_0%] md:border-none border-l-[3px] border-l-[#4B6EA0] md:p-0 pl-4 flex flex-col gap-8`}>
								{
									content.projects.map((project, index) => {
										return (
											<div key={project.title.text}>
												<Project project={project} />
											</div>
										);
									})
								}
							</div>
						</div>
					);
				})
			}
		</div>
	);
};

export default Contents;
