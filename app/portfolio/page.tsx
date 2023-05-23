'use client';

import ProjectCard from "@/app/portfolio/ProjectCard";
import Container from "@/app/components/Container";
import {useEffect, useRef, useState} from "react";

const Page = () => {
	const [projects, setProjects] = useState([
		{
			displayName: "AMath",
			routeName: "amath"
		},
		{
			displayName: "한움",
			routeName: "hanum",
		},
		{
			displayName: "효율부기",
			routeName: "hyoyulbugi"
		},
		{
			displayName: "틴리프",
			routeName: "teenlief"
		},
		{
			displayName: "노쓰",
			routeName: "nossu"
		},
		{
			displayName: "술도가",
			routeName: "suldoga"
		},
		{
			displayName: "Trash It",
			routeName: "trashit"
		},
		{
			displayName: "Wordable",
			routeName: "wordable"
		}
	]);
	const [growing, setGrowing] = useState(false);
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
				<div className={`grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center justify-center gap-4 mt-4`}>
					{
						projects.map((item, index) => {
							return (
								<ProjectCard
									key={index}
									name={item.displayName}
									routeName={item.routeName}
									imageSrc={"https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F102ed6b7-bca2-4312-bdec-614b91753b7a%2FiPad_Pro_12.9_.png?table=block&id=00a927eb-fe7b-4a54-8c99-6222d9af715c&cache=v2"}
									growing={growing}
									setGrowing={setGrowing}
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
				className={`fixed top-0 left-0 w-screen h-screen max-w-full z-[999] bg-gray-200`}
				style={{ clipPath: `polygon(${position.left}px ${position.top}px, ${position.left + position.width}px ${position.top}px, ${position.left + position.width}px ${position.top + position.height}px, ${position.left}px ${position.top + position.height}px)` }}
			/>
			<div
				ref={cardRef}
				className={`fixed top-0 left-0 w-screen h-screen max-w-full z-[1000] bg-white pt-32`}
				style={{ clipPath: `polygon(${position.left + 1}px ${position.top + 1}px, ${position.left + position.width - 1}px ${position.top + 1}px, ${position.left + position.width - 1}px ${position.top + position.height - 1}px, ${position.left + 1}px ${position.top + position.height - 1}px)` }}
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
					animation: grow 0.75s ease-in-out forwards;
				}
				@keyframes grow {
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
				
				.borderGrowing {
					animation: borderGrowing 0.75s ease-in-out forwards;
                }
				@keyframes borderGrowing {
					0% {
						clip-path: polygon(${position.left}px ${position.top}px, ${position.left + position.width}px ${position.top}px, ${position.left + position.width}px ${position.top+ position.height}px, ${position.left}px ${position.top + position.height}px);
					}
					25% {
						clip-path: polygon(0 3.5rem, ${position.left + position.width}px ${position.top}px, ${position.left + position.width}px ${position.top + position.height}px, ${position.left}px ${position.top + position.height}px);
                    }
					50% {
						clip-path: polygon(0 3.5rem, 100% 3.5rem, ${position.left + position.width}px ${position.top + position.height}px, ${position.left}px ${position.top + position.height}px);
                    }
					75% {
						clip-path: polygon(0 3.5rem, 100% 3.5rem, 100% 100%, ${position.left}px ${position.top + position.height}px);
                    }
					100% {
						clip-path: polygon(0 3.5rem, 100% 3.5rem, 100% 100%, 0 100%);
                    }
				}
			`}</style>
		</>
	);
};

export default Page;
