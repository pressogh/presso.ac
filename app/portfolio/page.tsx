'use client';

import ProjectCard from "@/app/components/ProjectCard";
import Container from "@/app/components/Container";
import {useEffect, useRef, useState} from "react";
import { useCardGrowingStore } from "@/app/hooks/useCardGrowingStore";
import {shallow} from "zustand/shallow";

const Page = () => {
	const [projects, setProjects] = useState([
		{
			displayName: "AMath",
			routeName: "amath",
			imageSrc: "/thumbnails/amath.png",
			projectType: "tablet",
			description: "오답노트 기능을 포함한 LMS 어플리케이션"
		},
		{
			displayName: "한움",
			routeName: "hanum",
			imageSrc: "/thumbnails/hanum.png",
			projectType: "web",
			description: "성적을 그래프 형태로 시각화해주는 웹 사이트"
		},
		{
			displayName: "효율부기",
			routeName: "hyoyulbugi",
			imageSrc: "/thumbnails/hyoyulbugi.png",
			projectType: "web",
			description: "편리하게 시간표를 짤 수 있는 웹 사이트"
		},
		{
			displayName: "틴리프",
			routeName: "teenlief",
			imageSrc: "/thumbnails/teenlief.png",
			projectType: "mobile",
			description: "가출 청소년들이 안전하게 도움을 받도록 도와주는 어플리케이션"
		},
		{
			displayName: "노쓰",
			routeName: "nossu",
			imageSrc: "/thumbnails/nossu.png",
			projectType: "mobile",
			description: "리워드 기반 쓰레기 수거 어플리케이션"
		},
		{
			displayName: "술도가",
			routeName: "suldoga",
			projectType: "web",
			description: "한국형 칵테일 레시피 및 술 문화 공유 사이트"
		},
		{
			displayName: "Trash It",
			routeName: "trashit",
			imageSrc: "/thumbnails/trashit.png",
			projectType: "mobile",
			description: "위치 기반 쓰레기통 정보 공유 어플리케이션"
		},
		{
			displayName: "Wordable",
			routeName: "wordable",
			projectType: "web",
			description: "자동 태깅 기능을 탑재한 동영상 공유 플랫폼"
		}
	]);
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
									imageSrc={item.imageSrc}
									projectType={item.projectType}
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
