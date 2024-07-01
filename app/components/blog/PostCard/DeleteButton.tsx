'use client'

import Trash from "@/public/icons/Trash";

interface Props {
	title: string;
}

const DeleteButton = ({ title }: Props) => {
	const handleClick = async () => {
		await fetch(`/api/posts/${encodeURIComponent(title)}`, {
			method: 'DELETE',
		});
	};

	return (
		<Trash className={`size-5 text-red-600 hover:cursor-pointer`} strokeWidth={1.5} onClick={handleClick}/>
	);
};

export default DeleteButton;
