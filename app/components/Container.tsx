'use client';

interface ContainerProps {
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
	children
}) => {
	return (
		<div className={`flex justify-center items-center`}>
			<div className={`sm:w-[42rem] w-full`} style={{ paddingLeft: `calc(min(16px, 8vw))`, paddingRight: `calc(min(16px, 8vw))` }}>
				{ children }
			</div>
		</div>
	);
};

export default Container;
