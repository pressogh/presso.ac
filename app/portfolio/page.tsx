'use client';

import ProjectCard from "@/app/components/ProjectCard";
import Container from "@/app/components/Container";
import {useEffect, useRef, useState} from "react";
import { useCardGrowingStore } from "@/app/hooks/useCardGrowingStore";
import {shallow} from "zustand/shallow";
import {projects} from "@/etc/Projects";

// TODO: fill project contents

const Page = () => {
	const growing = useCardGrowingStore((state: any) => state.growing, shallow);
	const cardRef = useRef<HTMLDivElement>(null);
	const cardBorderRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({
		top: 0,
		left: 0,
		width: 0,
		height: 0
	});
	
	useEffect(() => {
		if (growing) {
			let card = cardRef.current as HTMLDivElement;
			let cardBorder = cardBorderRef.current as HTMLDivElement;
			
			card.classList.add("growing");
			cardBorder.classList.add("borderGrowing");
		}
	}, [position]);
	
	return (
		<>
			<Container>
				<div className={`font-light sm:text-xl mt-10 text-md`}>
					지금까지 총 <span className={`font-medium`}>{projects.length}</span>개의 프로젝트를 진행했어요.
				</div>
				<hr className={`mt-3 mb-10`} />
				<div className={`grid sm:grid-cols-2 grid-cols-1 gap-4`}>
					{
						projects.map((item, index) => {
							return (
								<ProjectCard
									key={index}
									name={item.displayName}
									routeName={item.routeName}
									thumbnail={item.thumbnail}
									screenType={item.screenType}
									description={item.description}
									cardRef={cardRef}
									setPosition={setPosition}
								/>
							)
						})
					}
				</div>
			</Container>
			<div
				ref={cardBorderRef}
				className={`fixed top-0 left-0 w-screen h-screen max-w-full z-[999] bg-gray-200 dark:bg-neutral-800`}
				style={{ clipPath: `polygon(${position.left + 1}px ${position.top + 1}px, ${position.left + position.width - 1}px ${position.top + 1}px, ${position.left + position.width - 1}px ${position.top + position.height - 1}px, ${position.left + 1}px ${position.top + position.height - 1}px)` }}
			/>
			<div
				ref={cardRef}
				className={`fixed top-0 left-0 w-screen h-screen max-w-full z-[1000] bg-white dark:bg-neutral-900 pt-32`}
				style={{ clipPath: `polygon(${position.left + 2}px ${position.top + 2}px, ${position.left + position.width - 2}px ${position.top + 2}px, ${position.left + position.width - 2}px ${position.top + position.height - 2}px, ${position.left + 2}px ${position.top + position.height - 2}px)` }}
			>
				<Container>
					<div className={"flex animate-pulse"}>
						<div className={"w-80 h-[3rem] bg-slate-200 rounded-md"} />
						<div className={"w-1/2 h-full bg-slate-200"} />
					</div>
				</Container>
			</div>
			
			<style jsx>{`
				.growing {
					animation: grow 0.5s ease-in-out forwards;
				}
				@keyframes grow {
                    0% {
                        clip-path: polygon(${position.left + 2}px ${position.top + 2}px, ${position.left + position.width - 2}px ${position.top + 2}px, ${position.left + position.width - 2}px ${position.top + position.height - 2}px, ${position.left + 2}px ${position.top + position.height - 2}px);
                    }
                    25% {
                        clip-path: polygon(0 calc(3.5rem + 2px), ${position.left + position.width - 2}px ${position.top + 2}px, ${position.left + position.width - 2}px ${position.top + position.height - 2}px, ${position.left + 2}px ${position.top + position.height - 2}px);
                    }
                    50% {
                        clip-path: polygon(0 calc(3.5rem + 2px), 100% calc(3.5rem + 2px), ${position.left + position.width - 2}px ${position.top + position.height - 2}px, ${position.left + 2}px ${position.top + position.height - 2}px);
                    }
                    75% {
                        clip-path: polygon(0 calc(3.5rem + 2px), 100% calc(3.5rem + 2px), 100% 100%, ${position.left + 2}px ${position.top + position.height - 2}px);
                    }
                    100% {
                        clip-path: polygon(0 calc(3.5rem + 2px), 100% calc(3.5rem + 2px), 100% 100%, 0 100%);
                    }
				}
				
				.borderGrowing {
					animation: borderGrow 0.5s ease-in-out forwards;
                }
				@keyframes borderGrow {
                    0% {
                        clip-path: polygon(${position.left + 1}px ${position.top + 1}px, ${position.left + position.width - 1}px ${position.top + 1}px, ${position.left + position.width - 1}px ${position.top + position.height - 1}px, ${position.left + 1}px ${position.top + position.height - 1}px);
                    }
                    25% {
                        clip-path: polygon(0 calc(3.5rem + 1px), ${position.left + position.width - 1}px ${position.top + 1}px, ${position.left + position.width - 1}px ${position.top + position.height - 1}px, ${position.left + 1}px ${position.top + position.height - 1}px);
                    }
                    50% {
                        clip-path: polygon(0 calc(3.5rem + 1px), 100% calc(3.5rem + 1px), ${position.left + position.width - 1}px ${position.top + position.height - 1}px, ${position.left + 1}px ${position.top + position.height - 1}px);
                    }
                    75% {
                        clip-path: polygon(0 calc(3.5rem + 1px), 100% calc(3.5rem + 1px), 100% 100%, ${position.left + 1}px ${position.top + position.height - 1}px);
                    }
                    100% {
                        clip-path: polygon(0 calc(3.5rem + 1px), 100% calc(3.5rem + 1px), 100% 100%, 0 100%);
                    }
				}
			`}</style>
		</>
	);
};

export default Page;
