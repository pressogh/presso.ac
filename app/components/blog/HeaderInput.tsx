'use client';

import dayjs from "dayjs";

dayjs.locale("ko");

interface HeaderProps {
	title: string;
	setTitle: (title: string) => void;
	date: string;
	setDate: (date: string) => void;
}

const HeaderInput = ({ title, setTitle, date, setDate }: HeaderProps) => {
	return (
		<div>
			<input
				className={`font-semibold sm:text-5xl sm:leading-[4rem] text-4xl focus:outline-none w-full border-none bg-transparent`}
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder={"제목을 입력해주세요."}
			/>

			<div className={`font-extralight text-base mt-4 text-neutral-400 flex flex-row`}>
				<div>Posted at&nbsp;</div>
				<input className={`focus:outline-none border-none bg-transparent tracking-tighter font-extralight text-base text-neutral-400`} type={'date'} />
			</div>
		</div>
	);
};

export default HeaderInput;
