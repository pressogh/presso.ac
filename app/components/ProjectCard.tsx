'use client';

import Image from "next/image";
import {useRouter} from "next/navigation";
import {useCardGrowingStore} from "@/app/hooks/useCardGrowingStore";
import {shallow} from "zustand/shallow";

interface ProjectCard {
	name: string,
	routeName: string,
	imageSrc?: string,
	projectType?: string,
	description?: string,
	cardRef: React.RefObject<HTMLDivElement>,
	setPosition: (position: {
		top: number,
		left: number,
		width: number,
		height: number
	}) => void,
}

const ProjectCard: React.FC<ProjectCard> = ({
	name,
	routeName,
	imageSrc,
	projectType,
	description,
	cardRef,
	setPosition
}) => {
	const route = useRouter();
	const { growing, onGrowStart } = useCardGrowingStore((state: any) => state, shallow);
	
	const openCard = (event: React.MouseEvent<HTMLDivElement>) => {
		if (growing) return;
		onGrowStart();
		
		let target = event.currentTarget as HTMLDivElement;
		let position = target.getBoundingClientRect();
		setPosition(position);
		
		let card = cardRef.current as HTMLDivElement;
		card.onanimationend = () => {
			route.push(`/portfolio/${routeName}`);
		}
	}
	
	return (
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
			`}
			onClick={openCard}
			onMouseEnter={() => {
				route.prefetch(`/portfolio/${routeName}`);
			}}
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
						${projectType === "tablet" && "border-[6px] border-black rounded-lg w-60"}
						${projectType === "mobile" && "border-[3px] border-black rounded-md w-24 h-[11.5rem]"}
						${projectType === "web" && "border border-neutral-500 dark:border-neutral-700 border-t-[10px] border-t-neutral-800 dark:border-t-neutral-800 rounded-md w-64 h-[8.5rem]"}
						${imageSrc === undefined && "bg-white dark:bg-neutral-700"}
					`}
				>
					{
						projectType === "web" && (
							<div className={`absolute flex flex-row gap-0.5 right-2 top-[-0.45rem]`}>
								<div className={`w-1 h-1 rounded-full bg-red-500`} />
								<div className={`w-1 h-1 rounded-full bg-yellow-500`} />
								<div className={`w-1 h-1 rounded-full bg-green-500`} />
							</div>
						)
					}
					{
						imageSrc === undefined ? (
							<div
								className={`
									text-black
									dark:text-white
									${projectType === "mobile" ? "text-2xl" : "text-4xl"}
									font-bold
								`}
							>
								{ name }
							</div>
						) : (
							<Image
								src={imageSrc}
								alt={"profile image"}
								width={500}
								height={300}
								className={`
									h-full
									${projectType === "tablet" && "rounded-sm object-fill"}
									${projectType === "mobile" && "rounded-md object-fill"}
									${projectType === "web" && "rounded-b-md object-fill"}
								`}
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
	);
};

export default ProjectCard;
