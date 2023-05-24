import Container from "@/app/components/Container";

const Footer = () => {
	return (
		<div className={`flex justify-center items-center mb-14`}>
			<div className={`sm:w-[42rem] w-full`} style={{ paddingLeft: `calc(min(16px, 8vw))`, paddingRight: `calc(min(16px, 8vw))` }}>
				<div className={`flex flex-col gap-2 font-extralight`}>
					<div className={`flex flex-row text-md gap-6`}>
						<div className={`font-medium`}>프레소</div>
						<div className={`flex flex-row gap-2`}>
							<div>이메일</div>
							<div className={`font-medium`}>caff1nepill@gmail.com</div>
						</div>
					</div>
					<div>
						Copyright © PRESSO. All Rights Reserved.
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
