export interface WorkExperienceType {
	title: string;
	contents: ContentType[];
}

export interface ContentType {
	name: string;
	position: string;
	startDate?: string;
	endDate?: string;
	description: string;
	projects: ProjectType[];
}

export interface ProjectType {
	title: ProjectTitleType;
	startDate?: string;
	endDate?: string;
	description: string;
	works?: string[];
	techStack?: string[];
}

export interface ProjectTitleType {
	text: string;
	links?: ProjectTitleLinkType[];
}

export interface ProjectTitleLinkType {
	type: LinkType,
	url: string,
}

export type LinkType = 'github' | 'play-store' | 'app-store' | 'figma' | 'other';
