'use client';

import PencilSquare from "@/public/icons/PencilSquare";
import {useRouter} from "next/navigation";

interface Props {
	title: string;
}

const EditButton = ({ title }: Props) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/blog/editor?post=${encodeURIComponent(title)}`);
	}

	return (
		<div className={`font-extralight text-sm hover:cursor-pointer`} onClick={handleClick}>수정</div>
	);
};

export default EditButton;
