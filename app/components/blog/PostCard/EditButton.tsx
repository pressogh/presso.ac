'use client';

import PencilSquare from "@/public/icons/PencilSquare";

interface Props {
	title: string;
}

const EditButton = ({ title }: Props) => {
	const handleClick = () => {
		console.log(title);
	}

	return (
		<PencilSquare className={`size-5 hover:cursor-pointer`} strokeWidth={1.5} onClick={handleClick} />
	);
};

export default EditButton;
