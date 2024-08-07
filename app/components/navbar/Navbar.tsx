'use client';

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "@/app/components/Container";

import Logo from "@/public/icons/Logo";

const Navbar = () => {
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

	/**
	 * @description 페이지 전환 시 스크롤 위치를 0으로 초기화
	 */
	useEffect(() => {
		setScrollY(0);
	}, [pathName]);

	return (
		<>
			<nav
				className={`
					z-50
					w-full
					text-black
					dark:text-white
				`}
			>
				<div className={`py-4 bg-white dark:bg-[#202021] border-b-[1px] dark:border-neutral-500`}>
					<Container>
						<div className={`flex flex-row items-center justify-between gap-3 md:gap-0`}>
							<Link href={"/"} aria-label={"PRESSO"}>
								<Logo className={`w-6 h-6`} strokeWidth={60} />
							</Link>
							<div className={`flex flex-row items-center justify-center lg:gap-6 md:gap-4 gap-2 font-extralight duration-500`}>
								<Link href={"/"} className={`${pathName.split('/').at(-1) === "" ? "text-[#004ABF] dark:text-[#0063FF]" : ""}`} prefetch={true}>
									ABOUT
								</Link>
								<Link href={"/portfolio"} className={`${pathName.split('/').at(-1) === "portfolio" ? "text-[#004ABF] dark:text-[#0063FF]" : ""}`} prefetch={true}>
									PROJECT
								</Link>
								<Link href={"/blog"} className={`${pathName.split('/').at(-1) === "blog" ? "text-[#004ABF] dark:text-[#0063FF]" : ""}`} prefetch={true}>
									BLOG
								</Link>
							</div>
						</div>
					</Container>
				</div>
			</nav>
			<div className={`sticky top-0 z-50`}>
				<div className={`h-0.5 bg-indigo-500`} style={{ width: `${scrollY}%` }} />
			</div>
		</>
	);
};

export default Navbar;
