import { getOthers } from '@/app/lib/about/etc';
import { OthersType } from '@/types/about/OthersType';
import LinkIconGrid from '@/app/components/markdown/LinkIconGrid';

const Others = async () => {
	const data: OthersType = await getOthers();

	return (
		<div className={`mt-10 tracking-wide`}>
			<div
				className={`mb-8 text-3xl font-medium tracking-tighter md:text-4xl`}
			>
				{data.title}
			</div>
			<div>
				{data.contents.map((content, index) => {
					// @ts-ignore
					return (
						<div key={content.title} className={`mb-10`}>
							<div
								className={`relative mb-2 inline-block text-2xl font-medium`}
							>
								{content.title}
							</div>
							<div>
								{content.type === 'text' && (
									<ul
										className={`leading-2 marker ml-4 mt-4 list-outside list-disc text-sm marker:text-[rgb(75,110,160)] md:text-base md:leading-7`}
									>
										{content.list &&
											content.list.map((text, index) => {
												return (
													<>
														<li
															key={text.toString()}
															className={`mb-3 pl-2 md:mb-5 [&_a]:cursor-pointer [&_a]:text-blue-500 [&_a]:dark:text-blue-400`}
															dangerouslySetInnerHTML={{
																__html: text.toString(),
															}}
														/>
													</>
												);
											})}
									</ul>
								)}
								{content.type === 'icon-grid' &&
									content.list && (
										<>
											<LinkIconGrid
												// @ts-ignore
												links={content.list}
											/>
										</>
									)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Others;
