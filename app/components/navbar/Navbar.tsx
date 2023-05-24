'use client';

import Container from "@/app/components/Container";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import logo from "@/app/components/navbar/logo.svg";
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
				${growing ? "bg-white duration-500" : "backdrop-blur-[2px]"}
			`}
		>
			<div className={`py-4 border-b-[1px]`}>
				<Container>
					<div className={`flex flex-row items-center justify-between gap-3 md:gap-0`}>
						<Link href={"/portfolio"}>
							<Image src={logo} width={150} height={100} alt={"logo"} />
						</Link>
						<div>3</div>
					</div>
				</Container>
			</div>
			<div className={`h-0.5 bg-indigo-500`} style={{ width: `${scrollY}%` }}></div>
		</div>
	);
};

export default Navbar;
