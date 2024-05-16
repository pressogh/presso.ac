import Github from "@/public/icons/Github";
import PlayStore from "@/public/icons/PlayStore";
import Figma from "@/public/icons/Figma";
import Web from "@/public/icons/Web";
import Resume from "@/public/icons/Resume";
import Blog from "@/public/icons/Blog";
import Twitter from "@/public/icons/Twitter";
import AppStore from "@/public/icons/AppStore";

interface Props {
	icon: string,
	wrapperClassName?: string,
	iconClassName?: string,
}

const Icons = ({ type, className }: { type: string, className: string }) => {
	if (type === 'github') return <Github className={className} />
	else if (type === 'play-store') return <PlayStore className={className} />
	else if (type === 'app-store') return <AppStore className={className} />
	else if (type === 'figma') return <Figma className={className} />
	else if (type === 'web') return <Web className={className} />
	else if (type === 'resume') return <Resume className={className} />
	else if (type === 'blog') return <Blog className={className} />
	else if (type === 'twitter') return <Twitter className={className} />
	else return <></>
}

const LinkIcon = ({
	icon,
	wrapperClassName = ``,
	iconClassName = `w-1/2 h-1/2 group-hover:scale-110 transform duration-300 text-white`,
}: Props) => {
	const colors: { [key: string]: string } = {
		"github": 'bg-[rgb(51,51,51)] shadow-[0 0 1em 1em rgba(51,51,51,0.05)] dark:shadow-[0 0 0.5em 0.5em rgba(51,51,51,0.25)]',
		"play-store": 'bg-[rgb(238,242,255)] shadow-[0 0 1em 1em rgba(238,242,255,0.5)] dark:shadow-[0 0 0.5em 0.5em rgba(238,242,255,0.25)]',
		"app-store": 'bg-[rgb(238,242,255)] shadow-[0 0 1em 1em rgba(238,242,255,0.5)] dark:shadow-[0 0 0.5em 0.5em rgba(238,242,255,0.25)]',
		"figma": 'bg-[rgb(51,51,51)] shadow-[0 0 1em 1em rgba(51,51,51,0.05)] dark:shadow-[0 0 0.5em 0.5em rgba(51,51,51,0.25)]',
		"web": 'bg-[rgb(67,56,202)] shadow-[0 0 1em 1em rgba(67,56,202,0.05)] dark:shadow-[0 0 0.5em 0.5em rgba(67,56,202,0.25)]',
		"resume": 'bg-[rgb(67,56,202)] shadow-[0 0 1em 1em rgba(67,56,202,0.05)] dark:shadow-[0 0 0.5em 0.5em rgba(67,56,202,0.25)]',
		"blog": 'bg-[rgb(255,179,0)] shadow-[0 0 1em 1em rgba(255,179,0,0.05)] dark:shadow-[0 0 0.5em 0.5em rgba(255,179,0,0.25)]',
		"twitter": 'bg-[rgb(56,161,242)] shadow-[0 0 1em 1em rgba(56,161,242,0.05)] dark:shadow-[0 0 0.5em 0.5em rgba(56,161,242,0.25)]',
	}

	return (
		<div
			className={`
				sm:w-20 sm:h-20 w-12 h-12 group sm:rounded-2xl rounded-xl transform
				hover:scale-110 duration-300 flex items-center justify-center
				${colors[icon]} ${wrapperClassName}
			`}
		>
			<Icons type={icon} className={iconClassName} />
		</div>
	);
};

export default LinkIcon;
