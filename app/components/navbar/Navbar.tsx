'use client';

import Container from "@/app/components/Container";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import logo from "@/app/components/navbar/logo.svg";

const Navbar = () => {
	const pathName = usePathname();
	const [scrollY, setScrollY] = useState(0);
	
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
		setScrollY(0);
	}, [pathName]);
	
	return (
		<div className={`fixed w-full z-10 backdrop-blur-[2px]`}>
			<div className={`py-4 border-b-[1px]`}>
				<Container>
					<div className={`flex flex-row items-center justify-between gap-3 md:gap-0`}>
						<Image src={logo} width={150} height={100} alt={"logo"} />
						<div>3</div>
					</div>
				</Container>
			</div>
			<div className={`h-0.5 bg-indigo-500`} style={{ width: `${scrollY}%` }}></div>
		</div>
	);
};

export default Navbar;
