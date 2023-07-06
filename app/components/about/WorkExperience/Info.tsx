import dayjs from "dayjs";

let customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.locale("ko");
dayjs.extend(customParseFormat);

interface InfoProps {
    name: string,
    position?: string,
    description?: string,
    startDate?: string,
    endDate?: string,
}

const Info = ({
    name,
    position,
    description,
    startDate,
    endDate
}: InfoProps) => {
    return (
        <div className={`sticky top-8 flex-[3_3_0%] h-full`}>
            <div className={`w-56`}>
                <div className={`text-2xl font-medium mb-2`}>{ name }</div>
                <div className={`text-sm`}>
                    { startDate && dayjs(startDate, "YYYY.MM").format("YYYY.MM") }
                    { (startDate || endDate) && ' ~ ' }
                    { endDate && dayjs(endDate, "YYYY.MM").format("YYYY.MM") }
                </div>
                <div>{ position }</div>
                <div className={`text-neutral-500`}>{ description }</div>
            </div>
        </div>
    );
}

export default Info;
