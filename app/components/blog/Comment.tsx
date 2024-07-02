'use client';

import Giscus from "@giscus/react";

const Comment = () => {
	return (
		<div className={'giscus'}>
			<Giscus
				repo={"pressogh/presso.ac"}
				repoId={"R_kgDOI5m8jA"}
				category={"Comments"}
				categoryId={"DIC_kwDOI5m8jM4CXH7I"}
				mapping={"pathname"}
				strict={"0"}
				reactionsEnabled={"1"}
				emitMetadata={"0"}
				theme={"preferred_color_scheme"}
				lang={"ko"}
				loading={"lazy"}
			/>
		</div>
	);
};

export default Comment;
