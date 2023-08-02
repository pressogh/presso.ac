import { ProjectTitleLinkType } from '@/types/about/WorkExperienceType';
import Link from 'next/link';
import WorkExperienceTitleToolTipIcon from '@/app/components/about/WorkExperience/WorkExperienceTitleToolTipIcon';

interface ToolTipProps {
	links: ProjectTitleLinkType[];
}

const ToolTip = ({ links }: ToolTipProps) => {
	return (
		<span
			className={`
                after:contents-['']
                invisible
                absolute
                bottom-[100%]
                z-10
                flex
                flex-row
                items-center
                justify-center
                gap-5
                rounded-2xl
                bg-[#4B6EA0]
                px-6
                py-4
                text-center
                text-white
                opacity-0
                shadow-lg
                transition-all
                duration-300
                after:absolute
                after:left-[20%]
                after:top-full
                after:border-[5px]
                after:border-[#4B6EA0_transparent_transparent_transparent]
                group-hover:visible
                group-hover:bottom-[150%]
                group-hover:opacity-100
            `}
		>
			{links.map((link, index) => {
				return (
					<Link key={link.url} href={link.url}>
						<WorkExperienceTitleToolTipIcon type={link.type} />
					</Link>
				);
			})}
		</span>
	);
};

export default ToolTip;
