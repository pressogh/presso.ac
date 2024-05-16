import dayjs from "dayjs";

import TOC from "@/app/components/blog/TOC";
import Comment from "@/app/components/blog/Comment";
import Header from "@/app/components/blog/Header";
import Content from "@/app/components/blog/Content";
import Container from "@/app/components/Container";

dayjs.locale("ko");

export const dynamic = "force-dynamic";

interface Params {
	params: {
		slug: string
	}
}

const getData = async (slug: string) => {
	return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`).then(res => res.json());
}

const Page = async ({ params }: Params) => {
	const { content, title, date }: any = await getData(params.slug);

	return (
		<Container>
			<div className={"sm:mt-20 mt-6"}>
				<TOC />

				<Header title={title} date={date} />

				<div className={`my-10`}>
					<Content data={content} />
				</div>

				<Comment />
			</div>
		</Container>
	);
};

export default Page;
