'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Heading {
	id: string,
	text: string,
	tag: string,
	level: number,
}

const TOC = () => {
	const [headings, setHeadings] = useState<Heading[]>([]);

	const activeId = useScrollSpy({
		ids: headings.map(heading => heading.id),
		options: {
			rootMargin: '0% 0% -80% 0%',
		},
	});

	useEffect(() => {
		if (typeof document === "undefined") return;

		const headingStack: { id: string, text: string, tag: string, level: number }[] = [];
		const headings = Array.from(document.querySelectorAll<HTMLHeadingElement>("h1, h2, h3, h4")).map((heading) => {
			const id = heading.id;
			const text = heading.innerText;
			const tag = heading.tagName;
			let level: number;

			if (headingStack.length === 0) {
				headingStack.push({ id, text, tag, level: 0 });
				level = 0;
			} else {
				let last = headingStack[headingStack.length - 1];

				while (headingStack.length > 0) {
					last = headingStack[headingStack.length - 1];

					if (parseInt(tag[1]) <= parseInt(last.tag[1])) headingStack.pop();
					else break;
				}

				if (headingStack.length == 0) {
					headingStack.push({ id, text, tag, level: 0 });
					level = 0;
				}
				else {
					headingStack.push({ id, text, tag, level: last.level + 1 });
					level = last.level + 1;
				}
			}

			return { id, text, tag, level };
		});

		setHeadings(headings);
	}, []);

	return (
		<aside className={`sticky top-20 xl:block hidden`}>
			<div className={`absolute pt-0 2xl:w-80 w-60 overflow-hidden top-0 left-[calc(100%+4vw)] 2xl:left-[calc(100%+8vw)]`}>
				<div className={`2xl:text-3xl text-2xl font-medium tracking-tighter`}>Contents</div>
				<ul className={`list-disc w-full m-0 pl-5 pt-4 max-h-[calc(100vh-10rem)] overflow-auto padding-0`}>
					{
						headings.map((heading) => (
							<li
								key={heading.id}
								className={`
									font-light
									leading-6
									mb-[0.625rem]
									last:mb-0
									text-[rgb(136,144,150)]
									tracking-wide
									${heading.id === activeId ? 'text-[rgb(75,110,160)]' : ''}
									break-words
									text-base
								`}
								style={{
									marginLeft: `${heading.level * 1.25}rem`,
								}}
							>
								<Link
									href={`#${heading.id}`}
									className={`
										cursor-pointer
										pl-1
									`}
								>
									{ heading.text }
								</Link>
							</li>
						))
					}
				</ul>
			</div>
		</aside>
	);
};

export default TOC;

interface HookProps {
	ids: string[];
	options?: IntersectionObserverInit;
}

const useScrollSpy = ({ ids, options }: HookProps) => {
	const [activeId, setActiveId] = useState<string | null>();
	const observer = useRef<IntersectionObserver>();

	useEffect(() => {
		const elements = ids.map(id => document.getElementById(`${id}`));

		if (observer.current) {
			observer.current.disconnect();
		}

		observer.current = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setActiveId(entry.target.getAttribute('id'));
				}
			});
		}, options);

		elements.forEach(el => el && observer.current?.observe(el));
		return () => observer.current?.disconnect();
	}, [ids, options]);

	return activeId;
};
