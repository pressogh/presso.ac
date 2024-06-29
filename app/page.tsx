import Container from '@/app/components/Container';
import Header from '@/app/components/about/Header';
import WorkExperience from '@/app/components/about/WorkExperience';
import Others from '@/app/components/about/Others';
import Skills from '@/app/components/about/Skills';

export const metadata = {
	title: 'PRESSO | Kanghyoek Lee',
	description: '안녕하세요, 저는 이강혁입니다. 2년차 웹 개발자로 Django, FastAPI, React, NextJS를 주력으로 다양한 일들을 경험하고 있는 개발자입니다. 안주하는 것보다는 경험을 통해 변화하고 성장하는 것에 가치가 있다고 생각하며, 이를 실천하여 다양한 프로젝트를 경험하고 4개의 프로그래밍 대회에서 수상을 받은 경력이 있습니다.',
	keywords: ['이강혁', 'PRESSO', "이력서", "개발자", "산업기능요원"],
	authors: [{ name: '이강혁', url: 'https://presso.ac' }],
	creator: '이강혁',
	publisher: '이강혁',
	formatDetection: {
		email: true,
		address: false,
		telephone: true,
	},
}

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
