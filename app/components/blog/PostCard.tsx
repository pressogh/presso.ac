import {PostType} from "@/types/blog/PostType";
import Link from "next/link";
import dayjs from "dayjs";

dayjs.locale("ko");

interface Props {
	post: PostType
}

const PostCard = ({ post }: Props) => {
	return (
		<Link href={`/blog/${post.title.replace(/ /g, "-").replace("#", "")}`}>
			<div
				className={`
					transform
					duration-300
					hover:pl-4
					hover:border
					hover:border-t-0
					hover:border-r-0
					hover:border-b-0
					hover:border-l-4
					hover:border-indigo-800
				`}
			>
				<div className={`text-2xl font-medium text-neutral-800 dark:text-neutral-100`}>{ post.title }</div>
				<div className={`text-sm font-extralight mt-2`}>{ post.description }</div>
				<div className={`text-neutral-500 text-[0.75rem] font-light ${ post.description === null && "mt-6" }`}>{ dayjs(post.date).format("YYYY년 MM월 DD일") }</div>
			</div>
		</Link>
	);
};

export default PostCard;
