import Container from "@/app/components/Container";
import Link from "next/link";

const Footer = () => {
	return (
		<Container>
			<div className={`flex flex-col gap-2 font-extralight mb-14`}>
				<div className={`flex flex-row text-md gap-6`}>
					<div className={`font-medium`}>프레소</div>
					<div className={`flex flex-row gap-2`}>
						<div>이메일</div>
						<a href={"mailto:caff1nepill@gmail.com"}>
							<div className={`font-medium`}>caff1nepill@gmail.com</div>
						</a>
					</div>
				</div>
				<div>
					Copyright © PRESSO. All Rights Reserved.
				</div>
			</div>
		</Container>
	);
};

export default Footer;
