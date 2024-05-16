import { useEffect, useState } from "react";

const useDarkMode = () => {
	const [darkMode, setDarkMode] = useState(false);

	const checkDarkMode = (e: any) => {
		setDarkMode(!!e.matches);
	};

	useEffect(() => {
		const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

		setDarkMode(matchMedia.matches);
		matchMedia.addEventListener('change', checkDarkMode);

		return () => matchMedia.removeEventListener('change', checkDarkMode);
	}, []);

	return darkMode;
};

export default useDarkMode;
