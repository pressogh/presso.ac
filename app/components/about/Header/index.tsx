import { HeaderType } from '@/types/about/HeaderType';

const getData = async () => {
	return await fetch(`${process.env.RESUME_BUCKET_URL}/resume/about/header/data.json`).then(res => res.json());
}

const Index = async () => {
	const data: HeaderType = await getData();

	return (
		<header className={`my-8 md:my-16`}>
			<div
				className={`
					bg-gradient-to-r
					text-[rgba(42,74,191,1)]
					dark:text-[rgba(0,74,191,1)]
					bg-clip-text
					text-4xl
					font-bold
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
