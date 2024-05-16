import dayjs from "dayjs";

dayjs.locale("ko");

interface HeaderProps {
	title: string;
	date: string;
}

const Header = ({ title, date }: HeaderProps) => {
	return (
		<div>
			<div className={`font-semibold sm:text-5xl sm:leading-[4rem] text-4xl`}>{ title }</div>
			{
				date && (
					<div className={`font-extralight text-base mt-4 text-neutral-400`}>
						Posted at {dayjs(date).format("YYYY.MM.DD")}
					</div>
				)
			}
		</div>
	);
};

export default Header;
