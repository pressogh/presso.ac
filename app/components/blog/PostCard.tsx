import { PostType } from '@/types/blog/PostType';
import Link from 'next/link';
import dayjs from 'dayjs';

dayjs.locale('ko');

interface Props {
	post: PostType;
}

const PostCard = ({ post }: Props) => {
	return (
		<Link href={`/blog/${encodeURIComponent(post.title)}`}>
			<div
				className={`
					transform
					duration-300
					lg:hover:border-0
					lg:hover:border-l-4
					lg:hover:border-indigo-800
					lg:hover:pl-4
				`}
			>
				<div
					className={`text-2xl font-medium text-neutral-800 dark:text-neutral-100`}
				>
					{ post.title }
				</div>
				<div className={`mt-2 text-sm font-extralight`}>
					{ post.description }
				</div>
				<div
					className={`
						${ !post.description && 'mt-6' }
						text-[0.75rem]
						font-light
						text-neutral-500
					`}
				>
					{ post.date ? dayjs(post.date).format('YYYY년 MM월 DD일') : ' ' }
				</div>
			</div>
		</Link>
	);
};

export default PostCard;
