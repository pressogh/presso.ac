import {PostType} from "@/types/PostType";
import PostCard from "@/app/components/blog/PostCard";

interface Props {
	posts: PostType[]
}

const PostGrid = ({ posts }: Props) => {
	return (
		<div className={`flex flex-col gap-10`}>
			{
				posts.map((item, index) => {
					return (
						<PostCard post={item} key={item.title} />
					);
				})
			}
		</div>
	);
};

export default PostGrid;
