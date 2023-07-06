import {ProjectTitleLinkType} from "@/types/about/WorkExperienceType";
import Link from "next/link";
import WorkExperienceTitleToolTipIcon from "@/app/components/about/WorkExperienceTitleToolTipIcon";

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

export default ToolTip;
