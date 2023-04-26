import * as React from 'react'
import Head from 'next/head'

import { ExtendedRecordMap } from 'notion-types'
import { NotionRenderer } from 'react-notion-x'
import {Code} from "react-notion-x/build/third-party/code";
import {Collection} from "react-notion-x/build/third-party/collection";
import {Pdf} from "react-notion-x/build/third-party/pdf";
import {Equation} from "react-notion-x/build/third-party/equation";
import {Modal} from "react-notion-x/build/third-party/modal";


/*
TODO(2023.04.26):
1. Figma 연동
 */

export const NotionPage = ({ recordMap, rootPageId }: {
    recordMap: ExtendedRecordMap
    rootPageId?: string
}) => {
    if (!recordMap) {
        return null
    }

    return (
        <>
            <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                darkMode={false}
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
