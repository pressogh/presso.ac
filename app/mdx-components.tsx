import type { MDXComponents as MDXComponentsType } from 'mdx/types';
import Link from "next/link";
import Image from "next/image";

const MDXComponents = (components: MDXComponentsType): MDXComponentsType => {
	return {
		...components,
		a: ({ children, href, ...props }) => (
			<>
				{
					href && href.startsWith("/") ? (
						// @ts-ignore
						<Link href={href} className={`text-blue-500 dark:text-blue-400 hover:underline cursor-pointer`} {...props}>
							{ children }
						</Link>
					) : (
						<a href={href} className={`text-blue-500 dark:text-blue-400 hover:underline cursor-pointer`} {...props}>
							{ children }
						</a>
					)
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
			<p className={`font-light mb-3`} {...props}>
				{ children }
			</p>
		),
		img: ({ children, ...props }) => (
			// @ts-ignore
			<Image width={1000} height={1000} className={`my-3`} priority={true} {...props} />
		),
	};
}

export default MDXComponents;