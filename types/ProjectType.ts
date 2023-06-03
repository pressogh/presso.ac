import {ScreenType} from "@/types/ScreenType";
import {ReactElement} from "react";

export interface ProjectType {
	name: string,
	thumbnail?: string,
	screenType?: ScreenType,
	description?: string,
	displayPriority?: string,
	content?: ReactElement,
	tags?: string[],
	startDate?: string,
	endDate?: string,
}
