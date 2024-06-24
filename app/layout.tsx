import React from "react";

import './globals.css';
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: 'PRESSO | Kanghyoek Lee',
    description: '안녕하세요, 저는 이강혁입니다. 2년차 웹 개발자로 Django, FastAPI, React, NextJS를 주력으로 다양한 일들을 경험하고 있는 개발자입니다. 안주하는 것보다는 경험을 통해 변화하고 성장하는 것에 가치가 있다고 생각하며, 이를 실천하여 다양한 프로젝트를 경험하고 4개의 프로그래밍 대회에서 수상을 받은 경력이 있습니다.',
    keywords: ['이강혁', 'PRESSO', "이력서", "개발자", "산업기능요원"],
    authors: [{ name: '이강혁', url: 'https://presso.ac' }],
    creator: '이강혁',
    publisher: '이강혁',
    formatDetection: {
        email: true,
        address: false,
        telephone: true,
    },
}

export default function RootLayout({
  children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko-kr">
            <body>
                <Navbar />
                <div className={`pb-10 text-black dark:text-white`}>
                    { children }
                </div>
                <Footer />
            </body>
        </html>
    )
}
