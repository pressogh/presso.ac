import {Dayjs} from "dayjs";

interface Props {
	startDate: Dayjs,
	endDate: Dayjs
}

interface CalendarItemProps {
	date: Dayjs,
	index: number,
	startDate: Dayjs,
	endDate: Dayjs,
	calendarType: string
}

const CalendarItem = ({ date, index, startDate, endDate, calendarType }: CalendarItemProps) => {
	return (
		<div className={`flex justify-center items-center`}>
			<div
				className={`
					font-semibold
					text-sm
					w-full
					h-full
					flex
					justify-center
					items-center
					${ date.isAfter(startDate) && date.isBefore(endDate) && "bg-indigo-50" }
					${ date.isSame(startDate) && "rounded-l-md bg-indigo-500 text-white" }
					${ date.isSame(endDate) && "rounded-r-md bg-indigo-500 text-white" }
					${ index === 28 && ((date.isSame(startDate) || date.isSame(endDate)) ? "!rounded-bl-lg" : "!rounded-bl-xl") }
					${ index === 34 && ((date.isSame(startDate) || date.isSame(endDate)) ? "!rounded-br-lg" : "!rounded-br-xl") }
					${
						calendarType === "start" ? (
							(date.isBefore(startDate.startOf("month")) || date.isAfter(startDate.endOf("month"))) ? "text-indigo-200" : "text-indigo-900"
						) : (
							date.isBefore(endDate.startOf("month")) || date.isAfter(endDate.endOf("month")) ? "text-indigo-200" : "text-indigo-900"
						)
					}
				`}
			>
				{ date.format("DD") }
			</div>
		</div>
	)
}

const Calendar = ({ startDate, endDate }: Props) => {
	return (
		<div className={`flex flex-row justify-between mt-4`}>
			<div className={`w-[19.5rem] h-56 border border-indigo-500 rounded-xl`}>
				<div className={`flex justify-center items-center font-bold text-base py-2`}>{ startDate.format("YYYY.MM") }</div>
				<div className={`grid grid-cols-7 h-[calc(100%-2.5rem)]`}>
					{
						...Array.from(Array(35)).map((_, index) => {
							const date = startDate.date(index - 1);
							
							return (
								<CalendarItem key={index} index={index} date={date} startDate={startDate} endDate={endDate} calendarType={"start"} />
							);
						})
					}
				</div>
			</div>
			<div className={`w-[19.5rem] h-56 border border-indigo-500 rounded-xl`}>
				<div className={`flex justify-center items-center font-bold text-base py-2`}>{ endDate.format("YYYY.MM") }</div>
				<div className={`grid grid-cols-7 h-[calc(100%-2.5rem)]`}>
					{
						...Array.from(Array(35)).map((_, index) => {
							if (index >= 35) return null;
							const date = endDate.date(index - 1);
							
							return (
								<CalendarItem key={index} index={index} date={date} startDate={startDate} endDate={endDate} calendarType={"end"} />
							);
						})
					}
				</div>
			</div>
		</div>
	);
};

export default Calendar;
