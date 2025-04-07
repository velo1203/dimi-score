import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
    title: "스코어보드",
    description: "스코어보드",

    openGraph: {
        title: "스코어보드",
        description: "디미고 스코어보드",
        url: "https://score.devho.net",
        siteName: "score",
        locale: "ko_KR",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
