'use client';

import Image from "next/image";
import {useRouter} from "next/navigation";
import {useCardGrowingStore} from "@/app/hooks/useCardGrowingStore";
import {shallow} from "zustand/shallow";

interface ProjectCard {
	name: string,
	routeName: string,
	imageSrc: string
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
		<>
			<div
				className={`
					relative
					bg-white
					dark:bg-neutral-800
					border-[1px]
					dark:border-neutral-700
					w-full
					h-60
					rounded-sm
					duration-500
					hover:cursor-pointer
					hover:drop-shadow-md
					hover:scale-[1.02]
					justify-self-center
				`}
				onClick={openCard}
			>
				<Image src={imageSrc} alt={"profile image"} width={500} height={300} className={`h-40 object-none rounded-sm`} />
				<div className={`py-2 px-2`}>
					<div className={`font-light`}>{ name }</div>
				</div>
			</div>
		</>
	);
};

export default ProjectCard;
