import { redirect } from "next/navigation";

import { auth } from "@/app/auth";

import Container from "@/app/components/Container";
import BlogEditor from "@/app/components/blog/BlogEditor";

const Page = async () => {
	const session = await auth();
	if (!session || session.user?.email !== "caff1nepill@gmail.com") return redirect("/login?callbackUrl=/blog/editor");

	return (
		<Container>
			<div className={`sm:mt-20 mt-6`}>
				<BlogEditor />
			</div>
		</Container>
	);
};

export default Page;
