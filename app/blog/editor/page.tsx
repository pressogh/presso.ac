import { redirect } from "next/navigation";

import { auth } from "@/app/auth";

import Container from "@/app/components/Container";
import BlogEditor from "@/app/components/blog/BlogEditor";

const Page = async () => {
	const session = await auth();
	if (!session) return redirect("/login");

	return (
		<Container>
			<div className={`sm:mt-20 mt-6`}>
				<BlogEditor />
			</div>
		</Container>
	);
};

export default Page;
