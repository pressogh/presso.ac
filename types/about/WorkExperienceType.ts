export interface WorkExperienceType {
	title: string;
	contents: ContentType[];
}

interface ContentType {
	name: string;
	position: string;
	startDate?: string;
	endDate?: string;
	description: string;
	projects: ProjectType[];
}

interface ProjectType {
	title: ProjectTitleType;
	startDate?: string;
	endDate?: string;
	description: string;
	works?: string[];
	techStack?: string[];
}

interface ProjectTitleType {
	text: string;
	links?: ProjectTitleLinkType[];
}

interface ProjectTitleLinkType {
	type: LinkType,
	url: string,
}

export type LinkType = 'github' | 'play-store' | 'app-store' | 'figma' | 'other';
