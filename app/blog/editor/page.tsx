import { Suspense } from "react";
import dynamic from "next/dynamic";

import Container from "@/app/components/Container";
const Editor = dynamic(() => import('@/app/components/markdown/Editor'), { ssr: false })


const Page = () => {
	return (
		<Container>
			<div className={`sm:mt-10 mt-6 w-full`}>
				<Suspense fallback={null}>
					<Editor markdown={'Hello World!'} />
				</Suspense>
			</div>
		</Container>
	);
};

export default Page;
