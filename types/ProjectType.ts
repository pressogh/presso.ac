import {ScreenType} from "@/types/ScreenType";

export interface ProjectType {
	name: string,
	routeName: string,
	thumbnail?: string,
	screenType?: ScreenType,
	description?: string,
}
