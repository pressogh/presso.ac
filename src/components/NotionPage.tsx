import { ExtendedRecordMap } from 'notion-types'
import { NotionRenderer } from 'react-notion-x'
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import { Pdf } from "react-notion-x/build/third-party/pdf";
import { Equation } from "react-notion-x/build/third-party/equation";
import { Modal } from "react-notion-x/build/third-party/modal";
import { useDarkMode } from "@/hooks/useDarkMode";

/*
TODO(2023.04.26):
1. Figma 연동
 */

export const NotionPage = ({ recordMap, rootPageId }: {
    recordMap: ExtendedRecordMap
    rootPageId?: string
}) => {
    const isDarkMode = useDarkMode();

    if (!recordMap) {
        return null
    }

    return (
        <>
            <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                darkMode={isDarkMode}
                rootPageId={rootPageId}
                components={{
                    Code,
                    Collection,
                    Pdf,
                    Equation,
                    Modal,
                }}
            />
        </>
    )
}
