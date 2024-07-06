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
		<div className={`font-extralight text-sm text-red-500 hover:cursor-pointer`} onClick={handleClick}>삭제</div>
	);
};

export default DeleteButton;
