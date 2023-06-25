import {getWorkExperience} from "@/app/lib/about/etc";
import {WorkExperienceType} from "@/types/about/WorkExperienceType";
import Contents from "@/app/components/about/WorkExperience/Contents";

const WorkExperience = async () => {
	const data: WorkExperienceType = await getWorkExperience();
	
	return (
		<div className={`mt-4 tracking-wide`}>
			<div className={`md:text-4xl text-3xl font-medium tracking-tighter mb-8`}>{ data.title }</div>
			<Contents contents={data.contents} />
		</div>
	);
};

export default WorkExperience;
