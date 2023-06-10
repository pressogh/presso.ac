interface Props {
	text: string
}

const Conclusion = ({ text }: Props) => {
	return (
		<div className={`text-2xl font-light italic w-full flex justify-center items-center mt-6`}>
			" { text } "
		</div>
	);
};

export default Conclusion;
