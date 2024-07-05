import type { MDXComponents as MDXComponentsType } from 'mdx/types';
import Link from "next/link";
import Image from "next/image";

const MDXComponents = (components: MDXComponentsType): MDXComponentsType => {
	return {
		...components,
		a: ({ children, href, ...props }) => (
			<>
				{
					href ? (
						(href.startsWith("/") || href.startsWith("#")) ? (
							// @ts-ignore
							<Link href={href} className={`text-blue-500 dark:text-blue-400 cursor-pointer break-all`} {...props}>
								{ children }
							</Link>
						) : (href.startsWith("https://youtu.be") || href.startsWith("https://www.youtu.be") || href.startsWith("youtu.be")) ? (
							<iframe
								className={`w-full h-96 mb-4`}
								src={"https://www.youtube.com/embed/" + href.split("/").at(-1)}
								title={"YouTube video player"}
								allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
								allowFullScreen
							/>
						) : (href.startsWith("https://figma.com/embed") || href.startsWith("https://www.figma.com/embed") || href.startsWith("figma.com/embed")) ? (
							<iframe
								height={"500"}
								width={"100%"}
								src={href}
								allowFullScreen
							/>
						) : (
							<a href={href} className={`text-blue-500 dark:text-blue-400 cursor-pointer break-all`} rel="noopener noreferrer" target="_blank" {...props}>
								{ children }
							</a>
						)
					) : null
				}
			</>
		),
		h1: ({ children, ...props }) => (
			<h1 className={`font-semibold text-5xl mt-16 mb-10 break-all`} {...props}>
				{ children }
			</h1>
		),
		h2: ({ children, ...props }) => (
			<h2 className={`font-semibold text-4xl mt-14 mb-8 break-all`} {...props}>
				{ children }
			</h2>
		),
		h3: ({ children, ...props }) => (
			<h3 className={`font-semibold text-3xl mt-14 mb-8 break-all`} {...props}>
				{ children }
			</h3>
		),
		h4: ({ children, ...props }) => (
			<h4 className={`font-semibold text-2xl mt-14 mb-8 break-all`} {...props}>
				{ children }
			</h4>
		),
		h5: ({ children, ...props }) => (
			<h5 className={`font-semibold text-xl mt-12 mb-6 break-all`} {...props}>
				{ children }
			</h5>
		),
		h6: ({ children, ...props }) => (
			<h6 className={`font-semibold text-lg mt-10 mb-4 break-all`} {...props}>
				{ children }
			</h6>
		),
		p: ({ children, ...props }) => (
			<p className={`font-light leading-8 break-all`} {...props}>
				{ children }
			</p>
		),
		img: ({ children, ...props }) => (
			// @ts-ignore
			<Image width={1000} height={1000} className={`my-5 max-h-[30rem] object-contain`} priority={true} alt={props.src} {...props} />
		),
		hr: ({ children, ...props }) => (
			<hr className={`my-3`} {...props} />
		),
		strong: ({ children, ...props }) => (
			<strong className={`transform duration-300 bg-[#B7CDED]/60 hover:bg-[#B7CDED]/40 dark:bg-[#344C6E]/80 dark:hover:bg-[#344C6E]/60 px-1.5 py-0.5 text-[#344C6E] dark:text-[#B7CDED] rounded-lg font-light leading-7`} {...props}>
				{ children }
			</strong>
		),
		code: ({ children, className, ...props }) => {
			if (className?.startsWith("language-")) {
				return (
					<code className={className} {...props}>
						{ children }
					</code>
				)
			}

			return (
				<code className={`transform duration-300 bg-gray-200 hover:bg-gray-300 dark:bg-[#404040] dark:hover:bg-[#353535] px-1.5 py-0.5 rounded-lg font-light leading-7`} {...props}>
					{ children }
				</code>
			)
		},
		pre: ({ children, className, ...props }) => (
			<pre className={`${className} !my-4`} {...props}>
				{ children }
			</pre>
		),
		ul: ({ children, ...props }) => (
			<ul className={`list-disc ml-6 font-light mb-1`} {...props}>
				{ children }
			</ul>
		),
		li: ({ children, ...props }) => (
			<li className={`mt-1 leading-7`} {...props}>
				{ children }
			</li>
		),
		blockquote: ({ children, ...props }) => (
			<blockquote className={`my-4 px-4 py-4 text-[#7E868C] dark:text-[#787F85] bg-[#F1F3F5] dark:bg-[#16181A] rounded-2xl`} {...props}>
				{ children }
			</blockquote>
		),
	};
}

export default MDXComponents;
