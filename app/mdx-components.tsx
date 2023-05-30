import type { MDXComponents } from 'mdx/types';
import Link from "next/link";

const useMDXComponents = (components: MDXComponents): MDXComponents => {
	return {
		...components,
		a: ({ children, href, ...props }) => (
			// @ts-ignore
			<Link href={href} className={`text-blue-500 dark:text-blue-400 hover:underline cursor-pointer`} {...props}>
				{ children }
			</Link>
		),
	};
}

export default useMDXComponents;
