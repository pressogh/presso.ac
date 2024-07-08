'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import * as short from "short-uuid";

import { generateMDXWithFrontmatter } from "@/app/utils/mdx";

import ArrowRightUp from "@/public/icons/ArrowRightUp";
import {PATCH} from "@/app/api/posts/[post]/images/[image]/route";

dayjs.locale("ko");

interface HeaderProps {
	title: string;
	setTitle: (title: string) => void;
	date: string;
	setDate: (date: string) => void;
	description: string;
	setDescription: (description: string) => void;
	markdown: string;
	lastTitle: string;
}

const HeaderInput = ({ title, setTitle, date, setDate, description, setDescription, markdown, lastTitle }: HeaderProps) => {
	const router = useRouter();

	useEffect(() => {
		// 30초마다 자동 저장
		const interval = setInterval(() => {
			const post = {
				title,
				date,
				description,
				markdown,
			};
			localStorage.setItem('post', JSON.stringify(post));
		}, 5000);

		return () => clearInterval(interval);
	}, [title, date, description, markdown]);

	const handleSubmitButtonClick = async () => {
		if (title !== lastTitle) {
			const lastImageUrls = markdown.match(/\/api\/posts\/[^\/]+\/images\/[^\/]+\.[a-zA-Z0-9]+(?=\))/g) || [];

			await Promise.all(lastImageUrls.map(async (url) => {
				await fetch(url, {
					method: 'PATCH',
					body: JSON.stringify({ "newTitle": title })
				})

				const newImageUrl = url.replace(encodeURIComponent(lastTitle), encodeURIComponent(title));
				markdown = markdown.replace(url, newImageUrl);
			}));
		}

		const imageUrls = markdown.match(/blob:(http|https):\/\/.*\/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}/g) || [];

		await Promise.all(imageUrls.map(async (url) => {
			const image = await fetch(url).then((res) => res.blob());
			const imageType = image.type.split('/')[1];

			const response = await fetch(`/api/posts/${encodeURIComponent(title)}/images/${short.generate()}.${imageType}`, {
				method: 'PUT',
				body: image,
				headers: {
					'Content-Type': 'image/*',
				},
			});

			const json = await response.json();
			markdown = markdown.replace(url, json.url);

			return json.url;
		}));

		const frontmatter = {
			title,
			date,
			description,
		};

		const md = await generateMDXWithFrontmatter(frontmatter, markdown);

		if (lastTitle !== title) {
			await fetch(`/api/posts/${encodeURIComponent(lastTitle)}`, {
				method: 'DELETE',
			});

			await fetch('/api/posts', {
				method: 'POST',
				body: JSON.stringify({ "title": title, "data": md }),
			})
				.then(() => {
					localStorage.removeItem('post');
					router.push(`/blog/${encodeURIComponent(title)}`);
				});
		} else {
			await fetch('/api/posts', {
				method: 'POST',
				body: JSON.stringify({ "title": title, "data": md }),
			})
				.then(() => {
					localStorage.removeItem('post');
					router.push(`/blog/${encodeURIComponent(title)}`)
				});
		}
	};

	return (
		<div className={`flex flex-row justify-between items-end gap-[10%]`}>
			<div className={`w-full`}>
				<input
					className={`font-semibold sm:text-5xl sm:leading-[4rem] text-4xl focus:outline-none w-full border-none bg-transparent`}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder={"제목을 입력해주세요."}
				/>

				<div className={`font-extralight text-base mt-4 text-neutral-400 flex flex-row`}>
					<div>Posted at&nbsp;</div>
					<input
						className={`focus:outline-none border-none bg-transparent tracking-tighter font-extralight text-base text-neutral-400`}
						type={'datetime-local'} value={date} onChange={(e) => setDate(e.target.value)}
					/>
				</div>

				<textarea
					className={`font-extralight sm:text-base mt-2 focus:outline-none w-full h-12 border-none bg-transparent resize-none`}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder={"포스트에 대한 간단한 설명을 입력해주세요."}
				/>
			</div>

			<div className={`mb-8`}>
				<button
					className={`text-blue-600 p-2 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transform duration-300 font-light`}
					onClick={handleSubmitButtonClick}>
					<ArrowRightUp className={`size-4`} strokeWidth={2}/>
				</button>
			</div>
		</div>
	);
};

export default HeaderInput;
