import dayjs from 'dayjs';

let customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.locale('ko');
dayjs.extend(customParseFormat);

interface InfoProps {
	name: string;
	position?: string;
	description?: string;
	startDate?: string;
	endDate?: string;
}

const Info = ({
	name,
	position,
	description,
	startDate,
	endDate,
}: InfoProps) => {
	return (
		<div className={`md:sticky md:top-8 md:h-full md:flex-[3_3_0%]`}>
			<div className={`mb-4 text-sm md:w-56 md:text-base`}>
				<div className={`mb-2 text-xl font-medium md:text-2xl`}>
					{name}
				</div>
				<div className={`md:text-sm`}>
					{startDate && dayjs(startDate, 'YYYY.MM').format('YYYY.MM')}
					{(startDate || endDate) && ' ~ '}
					{endDate && dayjs(endDate, 'YYYY.MM').format('YYYY.MM')}
				</div>
				<div>{position}</div>
				<div className={`text-neutral-500`}>{description}</div>
			</div>
		</div>
	);
};

export default Info;
