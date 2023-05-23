import './globals.css'
import { Noto_Sans_KR } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";

const notoSansKR = Noto_Sans_KR({ weight: "400", subsets: ["latin"] })

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
            <body className={notoSansKR.className}>
                <Navbar />
                <div className={`pb-20 pt-14`}>
                    { children }
                </div>
            </body>
        </html>
    )
}
