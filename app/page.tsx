import Container from "@/app/components/Container";
import dayjs from "dayjs";
import Header from "@/app/components/about/Header";
import WorkExperience from "@/app/components/about/WorkExperience";
import Others from "@/app/components/about/Others";

const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.locale('ko');
dayjs.extend(customParseFormat);

export const dynamic = 'force-static';

export default async function Home() {
	return (
		<Container>
			<div className={`font-light w-full`}>
				{/* @ts-expect-error Async Server Component */}
				<Header />
				{/* @ts-expect-error Async Server Component */}
				<WorkExperience />
				{/* @ts-expect-error Async Server Component */}
				<Others />
			</div>
		</Container>
	)
}
