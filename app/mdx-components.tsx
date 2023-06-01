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
						href.startsWith("/") ? (
							// @ts-ignore
							<Link href={href} className={`text-blue-500 dark:text-blue-400 hover:underline cursor-pointer`} {...props}>
								{ children }
							</Link>
						) : (href.startsWith("https://youtu.be") || href.startsWith("https://www.youtu.be") || href.startsWith("youtu.be")) ? (
							<iframe
								className={`w-full h-96`}
								src={"https://www.youtube.com/embed/" + href.split("/").at(-1)}
								title={"YouTube video player"}
								allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
								allowFullScreen
							/>
						) : (href.startsWith("https://figma.com") || href.startsWith("https://www.figma.com") || href.startsWith("figma.com")) ? (
							<iframe
								height={"500"}
								width={"100%"}
								src={href}
								allowFullScreen
							/>
						) : (
							<a href={href} className={`text-blue-500 dark:text-blue-400 hover:underline cursor-pointer`} rel="noopener noreferrer" target="_blank" {...props}>
								{ children }
							</a>
						)
					) : null
				}
			</>
		),
		h1: ({ children, ...props }) => (
			<h1 className={`font-semibold text-5xl mt-10 mb-3`} {...props}>
				{ children }
			</h1>
		),
		h2: ({ children, ...props }) => (
			<h2 className={`font-semibold text-4xl mt-8 mb-3`} {...props}>
				{ children }
			</h2>
		),
		h3: ({ children, ...props }) => (
			<h3 className={`font-semibold text-3xl mt-4 mb-3`} {...props}>
				{ children }
			</h3>
		),
		h4: ({ children, ...props }) => (
			<h4 className={`font-semibold text-2xl mt-2 mb-3`} {...props}>
				{ children }
			</h4>
		),
		h5: ({ children, ...props }) => (
			<h5 className={`font-semibold text-xl mt-1 mb-3`} {...props}>
				{ children }
			</h5>
		),
		h6: ({ children, ...props }) => (
			<h6 className={`font-semibold text-lg mb-3`} {...props}>
				{ children }
			</h6>
		),
		p: ({ children, ...props }) => (
			<p className={`font-light mb-3 leading-6`} {...props}>
				{ children }
			</p>
		),
		img: ({ children, ...props }) => (
			// @ts-ignore
			<Image width={1000} height={1000} className={`my-3`} priority={true} alt={props.src} {...props} />
		),
		hr: ({ children, ...props }) => (
			<hr className={`my-3`} {...props} />
		),
	};
}

export default MDXComponents;
