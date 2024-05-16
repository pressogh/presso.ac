import { HeaderType } from '@/types/about/HeaderType';

const getData = async () => {
	return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about?query=header`).then(res => res.json());
}

const Index = async () => {
	const data: HeaderType = await getData();

	return (
		<header className={`my-8 md:my-16`}>
			<div
				className={`
					bg-gradient-to-r
					from-[rgba(17,24,28,1)]
					to-[rgba(0,74,191,1)]
					bg-clip-text
					text-4xl
					font-bold
					text-transparent
					dark:from-white
					dark:to-[rgba(0,74,191,1)]
					md:text-5xl
				`}
			>
				{ data.title }
			</div>

			<div className={`mt-6 flex flex-row items-center gap-6`}>
				{/*<div className={`h-16 w-16 rounded-full bg-black`} />*/}
				<div
					className={`text-sm font-thin md:text-base`}
					dangerouslySetInnerHTML={{ __html: data.description }}
				/>
			</div>
		</header>
	);
};

export default Index;
