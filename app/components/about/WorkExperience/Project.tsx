import {ProjectType} from "@/types/about/WorkExperienceType";
import ToolTip from "@/app/components/about/WorkExperience/ToolTip";
import dayjs from "dayjs";

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

export default Project;
