import dayjs from "dayjs";

dayjs.locale("ko");

interface HeaderProps {
	title: string;
	date: string;
	description: string;
}

const Header = ({ title, date, description }: HeaderProps) => {
	return (
		<div>
			<div className={`font-semibold sm:text-5xl sm:leading-[4rem] text-4xl`}>{title}</div>
			{
				date && (
					<div className={`font-extralight text-base mt-4 text-neutral-400 flex flex-row`}>
						<div>Posted at&nbsp;</div>
						<div>
							{ dayjs(date).format("YYYY.MM.DD HH:mm") }
						</div>
					</div>

				)
			}
			{
				description && (
					<div className={`font-extralight text-base mt-3`}>{description}</div>
				)
			}
		</div>
	)
		;
};

export default Header;
