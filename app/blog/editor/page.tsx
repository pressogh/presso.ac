import Container from "@/app/components/Container";
import BlogEditor from "@/app/components/blog/BlogEditor";

const Page = () => {
	return (
		<Container>
			<div className={`sm:mt-20 mt-6`}>
				<BlogEditor />
			</div>
		</Container>
	);
};

export default Page;
