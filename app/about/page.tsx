import Container from "@/app/components/Container";
import Link from "next/link";

const Page = () => {
	return (
		<Container>
			<header className={`my-8`}>
				<div className={`text-5xl font-bold from-[rgba(17,24,28,1)] to-[rgba(0,74,191,1)] bg-gradient-to-r bg-clip-text text-transparent`}>
					안녕하세요, 저는 이강혁입니다.
				</div>
			</header>
			
			<div className={`mt-4`}>
				<div className={`mb-4`}>
					<div className={`text-2xl font-thin mb-6`}>내용 준비 중입니다.</div>
					<div className={`text-2xl font-thin`}>다른 컨텐츠를 보고 싶다면...</div>
				</div>
				<div className={`grid sm:grid-cols-2 grid-cols-1 sm:h-40 h-80 gap-6`}>
					<Link href={'/portfolio'}>
						<div className={`w-full h-full border border-black dark:border-white flex justify-center items-center rounded-sm hover:border-indigo-700 hover:text-indigo-700 hover:cursor-pointer`}>
							<div className={`flex flex-row items-center justify-center gap-2`}>
								<div className={`text-2xl`}>프로젝트</div>
								<svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-7 h-7`}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
								</svg>
							</div>
						</div>
					</Link>
					
					<Link href={'/blog'}>
						<div className={`w-full h-full border border-black dark:border-white flex justify-center items-center rounded-sm hover:border-indigo-700 hover:text-indigo-700 hover:cursor-pointer`}>
							<div className={`flex flex-row items-center justify-center gap-2`}>
								<div className={`text-2xl`}>블로그</div>
								<svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-7 h-7`}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
								</svg>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</Container>
	);
};

export default Page;
