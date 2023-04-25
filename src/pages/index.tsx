import Header from "@/components/Header";
import {NotionPage} from "@/components/NotionPage";
import {rootNotionPageId} from "../../lib/config";
import notion from "../../lib/notion";
import {ExtendedRecordMap} from "notion-types";

export const getStaticProps = async() => {
	const recordMap = await notion.getPage(rootNotionPageId);

	return {
		props: {
			recordMap
		},
		revalidate: 10
	}
}

export default function Home({ recordMap }: { recordMap: ExtendedRecordMap }) {
	return (
		<div>
			<NotionPage recordMap={recordMap} />
		</div>
	)
}
