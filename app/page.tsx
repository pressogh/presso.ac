import Container from "@/app/components/Container";
import Link from "next/link";
import {getAbout} from "@/app/lib/about/etc";
import dayjs from "dayjs";
import {WorkExperienceType} from "@/types/WorkExperienceType";
import WorkExperienceTitleToolTipIcon from "@/app/components/about/WorkExperienceTitleToolTipIcon";

const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.locale('ko');
dayjs.extend(customParseFormat);

export const dynamic = 'force-static';

export default async function Home() {
	const data: WorkExperienceType = await getAbout();
	
	return (
		<Container>
			<header className={`my-16`}>
				<div className={`text-5xl font-bold from-[rgba(17,24,28,1)] to-[rgba(0,74,191,1)] bg-gradient-to-r bg-clip-text text-transparent`}>
					안녕하세요, 저는 이강혁입니다.
				</div>
			</header>
			
			<div className={`mt-4 tracking-wide`}>
				<div className={`text-4xl font-medium tracking-tighter mb-8`}>{ data.title }</div>
				<div>
					{
						data.contents.map((content, index) => {
							return (
								<div className={`flex flex-row justify-between w-full font-light mb-16`}>
									<div className={`sticky top-8 w-40 h-full`}>
										<div className={`text-2xl font-medium mb-2`}>{ content.name }</div>
										<div className={`text-sm`}>
											{ dayjs(content.startDate, "YYYY.MM").format("YYYY.MM") } ~ { dayjs(content.endDate, "YYYY.MM").format("YYYY.MM") }
										</div>
										<div>{ content.position }</div>
										<div className={`text-neutral-500`}>{ content.description }</div>
									</div>
									
									<div className={`w-[32rem]`}>
										{
											content.projects.map((project, index) => {
												return (
													<div className={`mb-10`}>
														<div className={`inline-block text-2xl font-medium mb-2 text-[#4B6EA0] group relative`}>
															<div>{ project.title.text }</div>
															{
																project.title.links &&
																<span
																	className={`
	                                                                    invisible
	                                                                    group-hover:visible
	                                                                    bg-[#4B6EA0]
	                                                                    text-white
	                                                                    text-center
	                                                                    px-6
	                                                                    py-4
	                                                                    absolute
	                                                                    z-10
	                                                                    rounded-2xl
	                                                                    after:contents-['']
	                                                                    after:absolute
	                                                                    after:border-[5px]
	                                                                    after:top-full
	                                                                    after:left-[20%]
	                                                                    after:border-[#4B6EA0_transparent_transparent_transparent]
	                                                                    opacity-0
	                                                                    group-hover:opacity-100
	                                                                    transition-all
	                                                                    duration-300
	                                                                    group-hover:bottom-[150%]
	                                                                    bottom-[100%]
	                                                                    shadow-lg
	                                                                    flex
	                                                                    flex-row
	                                                                    justify-center
	                                                                    items-center
	                                                                    gap-4
	                                                                `}
																>
	                                                                {
																		project.title.links.map((link, index) => {
																			return (
																				<Link href={link.url}>
																					<WorkExperienceTitleToolTipIcon type={link.type} />
																				</Link>
																			)
																		})
	                                                                }
	                                                            </span>
															}
														</div>
														<div className={`text-sm`}>
															{ dayjs(project.startDate, "YYYY.MM").format("YYYY.MM") } ~ { dayjs(project.endDate, "YYYY.MM").format("YYYY.MM") }
														</div>
														<div>
															<div>{ project.description }</div>
															<ul className={`list-disc list-outside mt-4 text-base leading-7 ml-4 marker:text-[rgb(75,110,160)] marker`}>
																{
																	project.works && project.works.map((work, index) => {
																		return (
																			<li className={`mb-5 pl-2 [&_a]:text-blue-500 [&_a]:dark:text-blue-400 [&_a]:cursor-pointer`} dangerouslySetInnerHTML={{ __html: work }} />
																		);
																	})
																}
															</ul>
															<div className={`flex gap-2 flex-wrap w-full`}>
																{
																	project.techStack && project.techStack.map((tech, index) => {
																		return (
																			<span className={`text-xs px-2 py-0.5 bg-[#ECEEF0] rounded-full`}>{ tech }</span>
																		);
																	})
																}
															</div>
														</div>
													</div>
												);
											})
										}
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		</Container>
	)
}
