import Container from "@/app/components/Container";

const Footer = () => {
	return (
		<div className={`mb-14`}>
			<Container>
				<div className={`flex flex-col gap-2 font-extralight`}>
					<div className={`flex flex-row text-md gap-6`}>
						<div className={`font-bold`}>프레소</div>
						<div className={`flex flex-row gap-2`}>
							<div>이메일</div>
							<div className={`font-bold`}>caff1nepill@gmail.com</div>
						</div>
					</div>
					<div>
						Copyright © PRESSO. All Rights Reserved.
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Footer;
