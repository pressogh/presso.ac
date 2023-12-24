import { useEffect, useState } from "react";

interface windowSizeType {
	width: undefined | number,
	height: undefined | number
}

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<windowSizeType>({
		width: undefined,
		height: undefined
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleResize = () => {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight
				});
			}

			window.addEventListener("resize", handleResize);
			handleResize();

			return () => window.removeEventListener("resize", handleResize);
		} else {
			return () => window.removeEventListener("resize", () => {
				return null
			});
		}
	}, [])

	return windowSize;
};

export default useWindowSize;
