'use client'

import { useRouter } from "next/navigation";

import Trash from "@/public/icons/Trash";

interface Props {
	title: string;
}

const DeleteButton = ({ title }: Props) => {
	const router = useRouter();

	const handleClick = async () => {
		await fetch(`/api/posts/${encodeURIComponent(title)}`, {
			method: 'DELETE',
		}).then(() => {
			router.refresh();
		});
	};

	return (
		<Trash className={`size-5 text-red-600 hover:cursor-pointer`} strokeWidth={1.25} onClick={handleClick}/>
	);
};

export default DeleteButton;
