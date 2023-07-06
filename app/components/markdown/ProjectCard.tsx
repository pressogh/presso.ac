import Image from "next/image";
import {ScreenType} from "@/types/portfolio/ScreenType";
import Link from "next/link";

interface ProjectCard {
	name: string,
	thumbnail?: string,
	screenType?: ScreenType,
	description?: string,
	blurDataURL?: string
}

const ProjectCard: React.FC<ProjectCard> = ({
	name,
	thumbnail,
	screenType,
	description,
	blurDataURL
}) => {
	return (
		<Link href={`/portfolio/${name.replace(/ /g, "-")}`}>
			<div
				className={`
					relative
					bg-white
					dark:bg-neutral-800
					border-[1px]
					dark:border-neutral-700
					w-full
					rounded-md
					duration-500
					hover:cursor-pointer
					hover:drop-shadow-md
					hover:scale-[1.02]
					justify-self-center
					group
				`}
			>
				<div
					className={`
						flex
						justify-center
						items-center
						bg-gradient-to-bl
						from-[#F6FAFF]
						to-neutral-50
						dark:from-neutral-900
						dark:to-neutral-800
						h-60
					`}
				>
					<div
						className={`
							relative
							flex
							justify-center
							items-center
							${screenType === "tablet" && "border-[6px] border-black rounded-lg w-60 h-[11rem]"}
							${screenType === "mobile" && "border-[3px] border-black rounded-md w-24 h-[11.5rem]"}
							${screenType === "web" && "border border-neutral-500 dark:border-neutral-700 border-t-[10px] border-t-neutral-800 dark:border-t-neutral-800 rounded-md w-64 h-[8.5rem]"}
							${thumbnail === undefined && "bg-white dark:bg-neutral-700"}
							transform
							duration-500
							group-hover:shadow-[0.3rem_0.5rem_0.2rem_0.2rem_rgba(60,60,60,0.05)]
							group-hover:scale-[1.075]
						`}
					>
						{
							screenType === "web" && (
								<div className={`absolute flex flex-row gap-0.5 right-2 top-[-0.45rem]`}>
									<div className={`w-1 h-1 rounded-full bg-red-500`} />
									<div className={`w-1 h-1 rounded-full bg-yellow-500`} />
									<div className={`w-1 h-1 rounded-full bg-green-500`} />
								</div>
							)
						}
						{
							thumbnail === undefined ? (
								<div
									className={`
										text-black
										dark:text-white
										${screenType === "mobile" ? "text-2xl" : "text-4xl"}
										font-bold
									`}
									style={{
										textShadow: "0.1em 0.075em 0.075em rgba(60, 60, 60, 0.15)"
									}}
								>
									{ name }
								</div>
							) : (
								<Image
									src={thumbnail}
									alt={"project image"}
									fill={true}
									priority={screenType === "web" || screenType === "tablet"}
									className={`
										${screenType === "tablet" && "rounded-sm"}
										${screenType === "mobile" && "rounded-md"}
										${screenType === "web" && "rounded-b-md"}
									`}
									placeholder={"blur"}
									blurDataURL={blurDataURL}
								/>
							)
						}
					</div>
				</div>
				<div className={`py-3 px-4`}>
					<div className={`font-light`}>{ name }</div>
					<div className={`font-thin text-sm`}>{ description }</div>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
