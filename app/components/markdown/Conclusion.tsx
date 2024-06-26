import React from "react";

interface Props {
	children: React.ReactNode;
}

const Conclusion = ({ children }: Props) => {
	return (
		<div className={`text-2xl font-light italic w-full flex justify-center items-center mt-6`}>
			&quot; { children } &quot;
		</div>
	);
};

export default Conclusion;
