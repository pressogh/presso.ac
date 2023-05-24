'use client';

import Container from "@/app/components/Container";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import {useCardGrowingStore} from "@/app/hooks/useCardGrowingStore";
import {shallow} from "zustand/shallow";

const Navbar = () => {
	const { growing, onGrowEnd } = useCardGrowingStore((state: any) => state, shallow);
	const [scrollY, setScrollY] = useState(0);
	
	const pathName = usePathname();
	
	/**
	 * 스크롤 위치를 계산하여 scrollY 상태를 업데이트
	 */
	useEffect(() => {
		const onScroll = () => {
			const totalScroll = document.documentElement.scrollTop;
			const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const scroll = `${totalScroll / windowHeight}`;
			// @ts-ignore
			setScrollY((scroll * 100).toFixed(1));
		};
		
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll, true);
	}, []);
	
	useEffect(() => {
		onGrowEnd();
	}, [pathName]);
	
	/**
	 * 페이지 전환 시 스크롤 위치를 0으로 초기화
	 */
	useEffect(() => {
		setScrollY(0);
	}, [pathName, growing]);
	
	return (
		<div
			className={`
				fixed
				w-full
				z-10
				${growing ? "bg-white duration-[400ms]" : "backdrop-blur-[2px]"}
			`}
		>
			<div className={`py-4 bg-white/60 border-b-[1px]`}>
				<Container>
					<div className={`flex flex-row items-center justify-between gap-3 md:gap-0`}>
						<Link href={"/"} aria-label={"PRESSO"}>
							<Logo />
						</Link>
						<div className={`flex flex-row items-center justify-center lg:gap-6 md:gap-4 gap-2 font-extralight`}>
							<Link href={"/about"}>
								<div className={`${pathName.split('/').at(-1) === "about" && "text-[#004ABF]"}`}>ABOUT</div>
							</Link>
							<Link href={"/portfolio"}>
								<div className={`${pathName.split('/').at(-1) === "portfolio" && "text-[#004ABF]"}`}>PROJECT</div>
							</Link>
							<Link href={"/blog"}>
								<div className={`${pathName.split('/').at(-1) === "blog" && "text-[#004ABF]"}`}>BLOG</div>
							</Link>
						</div>
					</div>
				</Container>
			</div>
			<div className={`h-0.5 bg-indigo-500`} style={{ width: `${scrollY}%` }} />
		</div>
	);
};

export default Navbar;