import { SVGProps } from "react";

const Logo = ({ ...props }: SVGProps<any>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit="10"
			clipRule="evenodd"
			viewBox="0 0 512 1024"
			{...props}
		>
			<defs>
				<path
					id="Fill"
					d="M0 0h212c165.685 0 300 134.315 300 300S377.685 600 212 600H0V0z"
				/>
				<path id="Fill_2" d="M256 591.045L0 1024V0h13.49L256 591.045z" />
			</defs>
			<clipPath id="ArtboardFrame">
				<path d="M0 0H512V1024H0z" />
			</clipPath>
			<g clipPath="url(#ArtboardFrame)">
				<mask
					id="StrokeMask"
					width="512"
					height="600"
					x="0"
					y="0"
					maskUnits="userSpaceOnUse"
				>
					<path d="M0 0H512V600H0z" />
					<use fill="#fff" fillRule="evenodd" xlinkHref="#Fill" />
				</mask>
				<use
					fill="none"
					stroke="#007aff"
					strokeLinecap="butt"
					strokeWidth={props.strokeWidth || 40}
					mask="url(#StrokeMask)"
					xlinkHref="#Fill"
				/>
				<g>
					<mask
						id="StrokeMask_2"
						width="256"
						height="1024"
						x="0"
						y="0"
						maskUnits="userSpaceOnUse"
					>
						<path d="M0 0H256V1024H0z" />
						<use fill="#fff" fillRule="evenodd" xlinkHref="#Fill_2" />
					</mask>
					<use
						fill="none"
						stroke="#007aff"
						strokeLinecap="butt"
						strokeWidth={props.strokeWidth || 40}
						mask="url(#StrokeMask_2)"
						xlinkHref="#Fill_2"
					/>
				</g>
			</g>
		</svg>
	)
};

export default Logo;
