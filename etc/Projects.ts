import {ScreenTypes} from "@/types/ScreenTypes";

interface Project {
	displayName: string,
	routeName: string,
	thumbnail?: string,
	screenType?: ScreenTypes,
	description?: string,
}

export const projects: Project[] = [
	{
		displayName: "AMath",
		routeName: "amath",
		thumbnail: "/thumbnails/amath.png",
		screenType: "web",
		description: "오답노트 기능을 포함한 LMS 어플리케이션",
	},
	{
		displayName: "한움",
		routeName: "hanum",
		thumbnail: "/thumbnails/hanum.png",
		screenType: "web",
		description: "성적을 그래프 형태로 시각화해주는 웹 사이트"
	},
	{
		displayName: "효율부기",
		routeName: "hyoyulbugi",
		thumbnail: "/thumbnails/hyoyulbugi.png",
		screenType: "web",
		description: "편리하게 시간표를 짤 수 있는 웹 사이트"
	},
	{
		displayName: "틴리프",
		routeName: "teenlief",
		thumbnail: "/thumbnails/teenlief.png",
		screenType: "mobile",
		description: "가출 청소년들이 안전하게 도움을 받도록 도와주는 어플리케이션"
	},
	{
		displayName: "노쓰",
		routeName: "nossu",
		thumbnail: "/thumbnails/nossu.png",
		screenType: "mobile",
		description: "리워드 기반 쓰레기 수거 어플리케이션"
	},
	{
		displayName: "술도가",
		routeName: "suldoga",
		screenType: "web",
		description: "한국형 칵테일 레시피 및 술 문화 공유 사이트"
	},
	{
		displayName: "Trash It",
		routeName: "trashit",
		thumbnail: "/thumbnails/trashit.png",
		screenType: "mobile",
		description: "위치 기반 쓰레기통 정보 공유 어플리케이션"
	},
	{
		displayName: "Wordable",
		routeName: "wordable",
		screenType: "web",
		description: "자동 태깅 기능을 탑재한 동영상 공유 플랫폼"
	}
]
