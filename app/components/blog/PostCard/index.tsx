import Link from 'next/link';

import dayjs from 'dayjs';

import { auth } from "@/app/auth";

import { PostType } from '@/types/blog/PostType';

import EditButton from "@/app/components/blog/PostCard/EditButton";
import DeleteButton from "@/app/components/blog/PostCard/DeleteButton";

dayjs.locale('ko');

interface Props {
	post: PostType;
}

const Index = async ({ post }: Props) => {
	const session = await auth();

	return (
		<div className={`w-full flex md:flex-row flex-col md:items-center justify-between`}>
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
			{
				session && session.user?.email === 'caff1nepill@gmail.com' && (
					<div className={`flex flex-row gap-3 md:ml-14 mt-2 md:mt-0 w-fit border border-[#7AA3DE] dark:border-[#3D79CF] text-[#344C6E] dark:text-blue-600 px-2.5 py-1.5 rounded-lg`}>
						<EditButton title={post.title} />
						<DeleteButton title={post.title} />
					</div>
				)
			}
		</div>
	);
};

export default Index;
