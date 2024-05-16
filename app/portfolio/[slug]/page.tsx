import Container from "@/app/components/Container";
import Content from "@/app/components/portfolio/Content";
import Header from "@/app/components/portfolio/Header";

export const dynamic = "force-dynamic";

interface Params {
	params: {
		slug: string
	}
}

const getData = async (slug: string) => {
	return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/${slug}`).then((res) => res.json());
}

const Page = async ({ params }: Params) => {
	const { name, description, tags, startDate, endDate, content }: any = await getData(params.slug);

	return (
		<Container>
			<div className={"sm:mt-20 mt-6"}>
				<Header name={name} description={description} tags={tags} startDate={startDate} endDate={endDate} />

				<div className={`mt-10`}>
					<Content data={content} />
				</div>
			</div>
		</Container>
	);
};

export default Page;
