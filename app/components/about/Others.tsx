import {getOthers} from "@/app/lib/about/etc";
import {OthersType} from "@/types/about/OthersType";
import LinkIconGrid from "@/app/components/markdown/LinkIconGrid";

const Others = async () => {
	const data: OthersType = await getOthers();
	
	return (
		<div className={`mt-4 tracking-wide`}>
			<div className={`text-4xl font-medium tracking-tighter mb-8`}>{ data.title }</div>
			<div>
				{
					data.contents.map((content, index) => {
						return (
							<div key={content.title} className={`mb-10`}>
								<div className={`inline-block text-2xl font-medium mb-2 relative`}>
									{ content.title }
								</div>
								<div>
									{
										content.type === "text" &&
										<ul className={`list-disc list-outside mt-4 text-base leading-7 ml-4 marker:text-[rgb(75,110,160)] marker`}>
											{
												content.list && content.list.map((text, index) => {
													return (
														<>
															{/* @ts-expect-error */}
															<li key={text} className={`mb-5 pl-2 [&_a]:text-blue-500 [&_a]:dark:text-blue-400 [&_a]:cursor-pointer`} dangerouslySetInnerHTML={{ __html: text }} />
														</>
													)
												})
											}
										</ul>
									}
									{
										(content.type === "icon-grid" && content.list) &&
										<>
											{/* @ts-expect-error */}
											<LinkIconGrid links={content.list} />
										</>
									}
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	);
};

export default Others;
