import { signIn } from "@/app/auth";

import Container from "@/app/components/Container";
import Github from "@/public/icons/Github";
import Logo from "@/public/icons/Logo";

const Page = () => {
	return (
		<Container>
			<div className={`w-full h-[calc(100lvh-14rem)] min-h-96 flex justify-center items-center font-light`}>
				<div
					className={`max-w-xs w-full h-80 border rounded-md flex flex-col items-center gap-10`}
				>
					<div className={`mt-24`}>
						<Logo className={`size-20`} />
					</div>
					<form
						action={async () => {
							"use server"
							await signIn("github", { redirectTo: "/blog/editor" });
						}}
						className={`mt-11 w-[90%] h-11 border py-2 rounded-md bg-[#303030] hover:bg-[#404040] transition-colors duration-300`}
					>
						<button type="submit" className={`flex justify-center items-center text-white`}>
							<Github className={`size-5 ml-4`} />
							<div className={`ml-12`}>Github로 로그인</div>
						</button>
					</form>
				</div>
			</div>
		</Container>
	)
};

export default Page;
