import {getAllPosts, getPost} from "@/app/lib/blog/etc";
import Container from "@/app/components/Container";
import dayjs from "dayjs";
import TOC from "@/app/components/blog/TOC";

dayjs.locale("ko");

const dynamicParams = false;
export { dynamicParams };

export const generateStaticParams = async () => {
	const posts = await getAllPosts();

	return posts.map((item) => {
		return {
			slug: item.title.replace(/ /g, "-").replace("#", "")
		};
	});
}

interface Params {
	params: {
		slug: string
	}
}

const Page = async ({ params }: Params) => {
	const { title, date, content }: any = await getPost(params.slug);

	return (
		<Container>
			<div className={"sm:mt-14 mt-6"}>
				<TOC />

				<div>
					<div className={`font-semibold sm:text-5xl text-4xl`}>{ title }</div>
					<div className={`font-extralight text-lg mt-4 text-neutral-400`}>{ dayjs(date).format("YYYY년 MM월 DD일") }</div>
				</div>

				<div className={`mt-16`}>
					{ content }
				</div>
			</div>
		</Container>
	);
};

export default Page;
