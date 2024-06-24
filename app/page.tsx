import Container from '@/app/components/Container';
import Header from '@/app/components/about/Header';
import WorkExperience from '@/app/components/about/WorkExperience';
import Others from '@/app/components/about/Others';
import Skills from '@/app/components/about/Skills';

const Page = () => {
	return (
		<Container>
			<div className={`w-full break-keep font-light`}>
				<Header />
				<WorkExperience />
				<Others />
				<Skills />
			</div>
		</Container>
	);
}

export default Page;
