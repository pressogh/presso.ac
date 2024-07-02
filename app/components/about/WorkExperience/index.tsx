import { WorkExperienceType } from "@/types/about/WorkExperienceType";
import Contents from "@/app/components/about/WorkExperience/Contents";

const getData = async () => {
	return await fetch(`${process.env.BUCKET_PRE_SIGNED_URL}/resume/about/work-experience/data.json`).then(res => res.json());
}

const Index = async () => {
	const data: WorkExperienceType = await getData();

	return (
		<div className={`mt-4 tracking-wide`}>
			<div className={`md:text-4xl text-3xl font-medium tracking-tighter mb-8`}>{ data.title }</div>
			<Contents contents={data.contents} />
		</div>
	);
};

export default Index;
