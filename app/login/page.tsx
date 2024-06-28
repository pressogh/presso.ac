import { signIn } from "@/app/auth";
import Container from "@/app/components/Container";

const Page = async () => {
	return (
		<Container>
			<div className={`w-full h-[calc(100lvh-14rem)] flex justify-center items-center text-4xl font-light tracking-tighter`}>
				<div
					className={`max-w-xs w-full h-80 border rounded-md flex flex-col justify-center items-center gap-10`}>
					<div>로그인</div>
					<form
						action={async () => {
							"use server"
							await signIn("github")
						}}
					>
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		</Container>
	)
};

export default Page;
