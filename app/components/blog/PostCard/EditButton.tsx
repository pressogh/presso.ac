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
		<PencilSquare className={`size-5 hover:cursor-pointer`} strokeWidth={1.5} onClick={handleClick} />
	);
};

export default EditButton;
