import React from "react";

import './globals.css';
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/Footer";

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
