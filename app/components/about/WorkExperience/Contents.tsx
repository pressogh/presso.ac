'use client';

import {ContentType, LinkType, ProjectTitleLinkType, ProjectType} from "@/types/about/WorkExperienceType";
import dayjs from "dayjs";
import Link from "next/link";
import WorkExperienceTitleToolTipIcon from "@/app/components/about/WorkExperienceTitleToolTipIcon";
import useWindowSize from "@/app/hooks/useWindowSize";

let customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.locale("ko");
dayjs.extend(customParseFormat);

interface TOCProps {
	name: string,
	position?: string,
	description?: string,
	startDate?: string,
	endDate?: string,
}

const TOC = ({
	name,
	position,
	description,
	startDate,
	endDate
}: TOCProps) => {
	return (
		<div className={`sticky top-8 flex-[3_3_0%] h-full`}>
			<div className={`w-56`}>
				<div className={`text-2xl font-medium mb-2`}>{ name }</div>
				<div className={`text-sm`}>
					{ startDate && dayjs(startDate, "YYYY.MM").format("YYYY.MM") }
					{ (startDate || endDate) && ' ~ ' }
					{ endDate && dayjs(endDate, "YYYY.MM").format("YYYY.MM") }
				</div>
				<div>{ position }</div>
				<div className={`text-neutral-500`}>{ description }</div>
			</div>
		</div>
	);
}

interface ToolTipProps {
	links: ProjectTitleLinkType[]
}

const ToolTip = ({ links }: ToolTipProps) => {
	return (
		<span
			className={`
                invisible
                group-hover:visible
                bg-[#4B6EA0]
                text-white
                text-center
                px-6
                py-4
                absolute
                z-10
                rounded-2xl
                after:contents-['']
                after:absolute
                after:border-[5px]
                after:top-full
                after:left-[20%]
                after:border-[#4B6EA0_transparent_transparent_transparent]
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-300
                group-hover:bottom-[150%]
                bottom-[100%]
                shadow-lg
                flex
                flex-row
                justify-center
                items-center
                gap-5
            `}
		>
            {
                links.map((link, index) => {
                    return (
                        <Link key={link.url} href={link.url}>
	                        <WorkExperienceTitleToolTipIcon type={link.type} />
                        </Link>
                    )
                })
            }
        </span>
	);
}

interface ProjectProps {
	project: ProjectType
}

const Project = ({ project }: ProjectProps) => {
	return (
		<div className={`md:text-base text-sm`}>
			<div className={`inline-block font-medium mb-2 ${project.title.links && "text-[#4B6EA0]"} group relative`}>
				<div className={`text-2xl`}>{ project.title.text }</div>
				{
					project.title.links && <ToolTip links={project.title.links} />
				}
			</div>
			<div className={`text-sm`}>
				{ project.startDate && dayjs(project.startDate, "YYYY.MM").format("YYYY.MM") }
				{ (project.startDate || project.endDate) && ' ~ ' }
				{ project.endDate && dayjs(project.endDate, "YYYY.MM").format("YYYY.MM") }
			</div>
			<div>
				<div>{ project.description }</div>
				<ul className={`list-disc list-outside mt-4 md:leading-7 leading-2 ml-4 marker:text-[rgb(75,110,160)] marker`}>
					{
						project.works && project.works.map((work, index) => {
							return (
								<li key={work} className={`md:mb-5 mb-3 pl-2 [&_a]:text-blue-500 [&_a]:dark:text-blue-400 [&_a]:cursor-pointer`} dangerouslySetInnerHTML={{ __html: work }} />
							);
						})
					}
				</ul>
				<div className={`flex gap-2 flex-wrap w-full`}>
					{
						project.techStack && project.techStack.map((tech, index) => {
							return (
								<span key={tech} className={`text-xs px-2 py-0.5 bg-[#ECEEF0] dark:bg-[#26292B] rounded-full`}>{ tech }</span>
							);
						})
					}
				</div>
			</div>
		</div>
	);
}

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
									<TOC name={content.name} position={content.position} description={content.description} startDate={content.startDate} endDate={content.endDate} />
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
