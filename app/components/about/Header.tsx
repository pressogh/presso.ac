import {getHeader} from "@/app/lib/about/etc";
import {HeaderType} from "@/types/about/HeaderType";

const Header = async () => {
	const data: HeaderType = await getHeader();
	
	return (
		<header className={`md:my-16 my-8`}>
			<div
				className={`
					md:text-5xl
					text-4xl
					font-bold
					from-[rgba(17,24,28,1)]
					dark:from-white
					to-[rgba(0,74,191,1)]
					dark:to-[rgba(0,74,191,1)]
					bg-gradient-to-r
					bg-clip-text
					text-transparent
				`}
			>
				{ data.title }
			</div>
		</header>
	);
};

export default Header;
