import Script from "next/script";

const Comment = () => {
	return (
		<div className={'giscus'}>
			<Script
				src={"https://giscus.app/client.js"}
		        data-repo={"pressogh/presso.codes"}
		        data-repo-id={"R_kgDOI5m8jA"}
		        data-category={"Comments"}
		        data-category-id={"DIC_kwDOI5m8jM4CXH7I"}
		        data-mapping={"pathname"}
		        data-strict={"0"}
		        data-reactions-enabled={"1"}
		        data-emit-metadata={"0"}
		        data-input-position={"top"}
		        data-theme={"preferred_color_scheme"}
		        data-lang={"ko"}
		        data-loading={"lazy"}
		        crossOrigin={"anonymous"}
		        async
			/>
		</div>
	);
};

export default Comment;
