import Container from '@/app/components/Container';
import Header from '@/app/components/about/Header/Header';
import WorkExperience from '@/app/components/about/WorkExperience/WorkExperience';
import Others from '@/app/components/about/Others/Others';
import Skills from '@/app/components/about/Skills/Skills';

export const dynamic = 'force-static';

export default async function Home() {
	return (
		<Container>
			<div className={`w-full break-keep font-light`}>
				<Header />
				<WorkExperience />
				<Skills />
				<Others />
			</div>
		</Container>
	);
}
