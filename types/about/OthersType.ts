export interface OthersType {
	title: string,
	contents: ListType[]
}

interface ListType {
	title: string,
	type: ContentType,
	list?: string[] | ListIcon[],
}

interface ListIcon {
	name: string,
	icon: IconType,
	url: string
}

type ContentType = "text" | "icon-grid";
type IconType = "github" | "figma" | "blog" | "resume" | "web" | "twitter"
