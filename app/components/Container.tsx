import React from "react";

interface ContainerProps {
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
	children
}) => {
	return (
		<div className={`flex justify-center items-center`}>
			<div className={`sm:max-w-[60rem] w-full px-[calc(min(16px,8vw))]`}>
				{ children }
			</div>
		</div>
	);
};

export default Container;
