'use client';

import { useRouter } from "next/navigation";

import Plus from "@/public/icons/Plus";

const AddPost = () => {
	const router = useRouter();

	return (
		<div
			className={`
				flex justify-center items-center sm:size-10 text-blue-600 p-2 rounded-md border border-blue-600 hover:bg-blue-600 transition-colors duration-300 hover:text-white
				mt-8 sm:m-0 w-full h-12
			`}
			onClick={() => router.push('/blog/editor')}
		>
			<Plus className={`size-5`} strokeWidth={1} />
			<div className={`sm:hidden ml-2 font-extralight`}>새 글 작성하기</div>
		</div>
	);
};

export default AddPost;
