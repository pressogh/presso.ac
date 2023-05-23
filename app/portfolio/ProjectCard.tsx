'use client';

import Image from "next/image";
import {useRouter} from "next/navigation";

interface ProjectCard {
	name: string,
	routeName: string,
	imageSrc: string
	growing: boolean,
	setGrowing: (growing: boolean) => void,
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
	growing,
	setGrowing,
	cardRef,
	setPosition
}) => {
	const route = useRouter();
	
	const openCard = (event: React.MouseEvent<HTMLDivElement>) => {
		if (growing) return;
		setGrowing(true);
		
		let target = event.currentTarget as HTMLDivElement;
		let position = target.getBoundingClientRect();
		setPosition(position);
		
		let card = cardRef.current as HTMLDivElement;
		card.onanimationend = () => {
			route.push(`/portfolio/${routeName}`);
			setGrowing(false);
		}
	}
	
	return (
		<>
			<div
				className={`
					relative
					bg-white
					py-2
					px-3
					border-[1px]
					w-full
					h-full
					duration-500
					hover:cursor-pointer
					hover:drop-shadow-md
					hover:scale-[1.02]
					justify-self-center
				`}
				onClick={openCard}
			>
				<Image src={imageSrc} alt={"profile image"} width={500} height={500} />
				<div>{ name }</div>
			</div>
		</>
	);
};

export default ProjectCard;
