'use client';

import Plus from "@/public/icons/Plus";
import { useRouter } from "next/navigation";

const AddPost = () => {
	const router = useRouter();

	return (
		<div
			className={`flex justify-center items-center size-10 text-blue-600 p-2 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white`}
			onClick={() => router.push('/blog/editor')}
		>
			<Plus className={`size-5`} strokeWidth={1}/>
		</div>
	);
};

export default AddPost;
