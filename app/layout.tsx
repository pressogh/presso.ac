import './globals.css';
import localFont from 'next/font/local';
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/Footer";

const pretendard = localFont({
    src: '../public/fonts/pretendard.woff2',
})

export const metadata = {
    title: 'PRESSO | Kanghyoek Lee',
    description: 'Portfolio for PRESSO',
}

export default function RootLayout({
  children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko-kr">
            <body className={pretendard.className}>
                <Navbar />
                <div className={`pb-20 pt-14 text-black dark:text-white`}>
                    { children }
                </div>
                <Footer />
            </body>
        </html>
    )
}
