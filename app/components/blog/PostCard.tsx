import {PostType} from "@/types/PostType";
import Link from "next/link";
import dayjs from "dayjs";

dayjs.locale("ko");

interface Props {
	post: PostType
}

const PostCard = ({ post }: Props) => {
	return (
		<Link href={`/blog/${post.title.replace(/ /g, "-")}`}>
			<div className={`transform duration-300 hover:pl-4 hover:border hover:border-t-0 hover:border-r-0 hover:border-b-0 hover:border-l-4 hover:border-indigo-950 `}>
				<div className={`text-3xl font-medium text-neutral-800`}>{ post.title }</div>
				<div className={`text-xs font-thin mt-4`}>{ dayjs(post.date).format("YYYY-MM-DD") }</div>
				<div className={`font-light`}>{ post.description }</div>
			</div>
		</Link>
	);
};

export default PostCard;